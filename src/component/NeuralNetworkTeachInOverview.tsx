import { useI18n } from '../i18n'

function NeuralNetworkTeachInOverview() {
  const { t } = useI18n()

  return (
    <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>{t('overview.nn.title')}</h3>
      <p style={{ margin: 0 }}>{t('overview.nn.p1')}</p>
      <p style={{ margin: 0 }}>{t('overview.nn.p2')}</p>
      <p style={{ margin: 0 }}>
        {t('overview.nn.link')}{' '}
        <a href="https://github.com/acdu01/neural-network-teach-in/tree/main" target="_blank" rel="noreferrer">
          github.com/acdu01/neural-network-teach-in
        </a>
      </p>
    </div>
  )
}

export default NeuralNetworkTeachInOverview
