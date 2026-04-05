import { useI18n } from '../i18n'

function TerminalTheGameOverview() {
  const { t } = useI18n()

  return (
    <div style={{ display: 'grid', gap: '12px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>{t('overview.terminal.title')}</h3>
      <p style={{ margin: 0 }}>{t('overview.terminal.p1')}</p>
      <p style={{ margin: 0 }}>{t('overview.terminal.p2')}</p>
      <p style={{ margin: 0 }}>
        {t('overview.terminal.link')}{' '}
        <a href="https://olincollege.github.io/terminal/" target="_blank" rel="noreferrer">
          olincollege.github.io/terminal
        </a>
      </p>
    </div>
  )
}

export default TerminalTheGameOverview
