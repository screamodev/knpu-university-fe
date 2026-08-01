export interface NewspaperIssuePreview {
  id: string
  /** «№ 7 (360)» — composed from the issue's number and continuous number. */
  issueLabel: string
  /** «липень 2026» */
  dateLabel: string
  /** Optional theme of the issue; usually empty for the migrated archive. */
  description: string
  /** Direct link to the PDF, when the issue has a file. */
  href?: string
  cover?: string
}
