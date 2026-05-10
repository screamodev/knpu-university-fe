#!/usr/bin/env python3
"""Read-only: report English locale strings that look stale vs Ukrainian (no network).

Loads app/locales/en.json and app/locales/uk.json and compares string leaves at identical
paths. Flags:
  - lorem: EN contains «Lorem ipsum»
  - latin_filler: EN looks like boilerplate Latin
  - en_equals_uk: identical string in both locales (often untranslated)
  - uk_cyrillic_en_maybe_stale: UK has Cyrillic and no Lorem, EN has Latin filler heuristic

Exit code always 0. Prints grouped key paths.

Usage:
  python3 scripts/list_stale_en_locale.py
  python3 scripts/list_stale_en_locale.py --prefix admissions
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

CYRILLIC_RE = re.compile(r"[\u0400-\u04FF]")

LATIN_FILLER_HINTS = (
    "consectetur adipiscing",
    "sed do eiusmod",
    "duis aute irure",
    "excepteur sint occaecat",
)


def flatten_strings(prefix: str, node: Any) -> dict[str, str]:
    out: dict[str, str] = {}

    def walk(path: str, n: Any) -> None:
        if isinstance(n, dict):
            for key in sorted(n.keys()):
                p = f"{path}.{key}" if path else str(key)
                walk(p, n[key])
            return
        if isinstance(n, list):
            for i, item in enumerate(n):
                p = f"{path}[{i}]"
                walk(p, item)
            return
        if isinstance(n, str):
            out[path if path else ""] = n

    walk(prefix.strip("."), node)
    if "" in out and not prefix:
        del out[""]
    return out


def has_cyrillic(text: str) -> bool:
    return bool(CYRILLIC_RE.search(text))


def latinish_en(text: str) -> bool:
    low = text.lower()
    if "lorem ipsum" in low:
        return True
    return any(h in low for h in LATIN_FILLER_HINTS)


def uk_effectively_placeholder(text: str) -> bool:
    low = text.lower()
    if "lorem ipsum" in low:
        return True
    return any(h in low for h in LATIN_FILLER_HINTS)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prefix", default="", help="Filter keys by prefix path, e.g. university.press")
    args = parser.parse_args()

    loc_dir = Path(__file__).resolve().parent.parent / "app" / "locales"
    en_path = loc_dir / "en.json"
    uk_path = loc_dir / "uk.json"

    with en_path.open(encoding="utf-8") as e:
        en_root: dict[str, Any] = json.load(e)
    with uk_path.open(encoding="utf-8") as u:
        uk_root: dict[str, Any] = json.load(u)

    prefix_parts = [p for p in args.prefix.strip(".").split(".") if p]
    en_node: Any = en_root
    uk_node: Any = uk_root
    for part in prefix_parts:
        if not isinstance(en_node, dict) or part not in en_node:
            print(f"No path in en.json: {args.prefix}", file=sys.stderr)
            return 0
        en_node = en_node[part]
        if isinstance(uk_node, dict) and part in uk_node:
            uk_node = uk_node[part]

    dotted_prefix = ".".join(prefix_parts)
    en_map = flatten_strings(dotted_prefix, en_node)

    uk_map: dict[str, str] = {}
    if isinstance(uk_node, (dict, list)) or uk_node is None:
        if isinstance(uk_node, dict) or isinstance(uk_node, list):
            uk_map = flatten_strings(dotted_prefix, uk_node)

    groups: dict[str, list[str]] = {
        "lorem": [],
        "latin_filler": [],
        "en_equals_uk": [],
        "uk_real_en_potentially_stale": [],
        "missing_uk_leaf": [],
    }

    for key, en_val in sorted(en_map.items()):
        uk_val = uk_map.get(key)
        if uk_val is None:
            groups["missing_uk_leaf"].append(key)
            continue

        low = en_val.lower()
        if "lorem ipsum" in low:
            groups["lorem"].append(key)
            continue

        if latinish_en(en_val) and ("lorem ipsum" not in low):
            groups["latin_filler"].append(key)

        if en_val == uk_val and en_val.strip() != "":
            groups["en_equals_uk"].append(key)

        if has_cyrillic(uk_val) and not uk_effectively_placeholder(uk_val) and latinish_en(en_val):
            groups["uk_real_en_potentially_stale"].append(key)

    for label, paths in groups.items():
        uniq = sorted(set(paths))
        if not uniq:
            continue
        print(f"\n=== {label} ({len(uniq)} keys) ===")
        shown = uniq[:600]
        for p in shown:
            print(p)
        if len(uniq) > 600:
            print(f"... and {len(uniq) - 600} more")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
