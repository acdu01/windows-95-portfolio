import { useI18n } from '../i18n'

function CrestOverview() {
  const { t } = useI18n()

  return (
    <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>{t('overview.crest.title')}</h3>
      <p style={{ margin: 0 }}>{t('overview.crest.p1')}</p>
      <p style={{ margin: 0 }}>{t('overview.crest.p2')}</p>
    </div>
  )
}

export default CrestOverview
