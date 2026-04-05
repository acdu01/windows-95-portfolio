import { Fieldset, Tab, Tabs } from '@react95/core'

const styles = {
  page: {
    display: 'grid',
    gap: '12px',
    lineHeight: 1.55,
  } as const,
  section: {
    marginBottom: '10px',
  } as const,
  list: {
    margin: '8px 0 0 0',
    paddingLeft: '18px',
  } as const,
  listItem: {
    marginBottom: '8px',
  } as const,
} as const

function Resume() {
  return (
    <Tabs defaultActiveTab="Overview">
      <Tab title="Overview">
        <div style={styles.page} className="resume-page">
          <h3 style={{ margin: 0, fontWeight: 700 }}>Anna Du</h3>
        <p>
          <a href="mailto:annacdu1@gmail.com">annacdu1@gmail.com</a> |{' '}
          <a href="https://www.annadu.org" target="_blank" rel="noreferrer">
            www.annadu.org
          </a>{' '}
          |{' '}
          <a href="https://www.linkedin.com/in/annacdu/" target="_blank" rel="noreferrer">
            www.linkedin.com/in/annacdu/
          </a>
        </p>

        <Fieldset legend="Education">
          <p>
            Olin College of Engineering, Needham, MA | Expected Grad: May 2028 | GPA: 3.9/4.0
          </p>
          <p style={{ marginTop: '8px' }}>B.S. Electrical and Computer Engineering</p>
        </Fieldset>
        </div>
      </Tab>

      <Tab title="Experience">
        <div style={styles.page} className="resume-page">
        <Fieldset legend="Chimera Research - AI Engineer (Jan 2026 - Present)">
          <ul style={styles.list}>
            <li style={styles.listItem}>Built AI agent infrastructure for test generation, documentation, and validation in CI/CD.</li>
            <li style={styles.listItem}>Designed cluster-based execution systems for scalable agent workflows and benchmarking.</li>
            <li style={styles.listItem}>Developed platform/simulator interfaces (Modal) for large-scale scientific and ML pipelines.</li>
          </ul>
        </Fieldset>

        <Fieldset legend="Center for Science Engagement - AI Research Fellow (Summer 2023 - Present)">
          <ul style={styles.list}>
            <li style={styles.listItem}>Conducted physical AI research in Project CANVAS (Mass Cultural Council-supported program).</li>
            <li style={styles.listItem}>Designed and evaluated ML interventions integrating sensing, perception, and interaction.</li>
            <li style={styles.listItem}>Developed curricula and assessments grounded in computational and scientific literacy.</li>
          </ul>
        </Fieldset>

        <Fieldset legend="CREST Lab, Olin - Undergraduate Researcher (Jan 2025 - Present)">
          <ul style={styles.list}>
            <li style={styles.listItem}>Developed a transformer-based vision pipeline for static geologic feature analysis from AUV data.</li>
            <li style={styles.listItem}>Built modular sensing and control software with real-time signal processing for AUV deployment.</li>
            <li style={styles.listItem}>Paper accepted to the IEEE OCEANS 2026 regular technical track.</li>
          </ul>
        </Fieldset>

        <Fieldset legend="PIT-NE / NFHA + BU - Artificial Intelligence Fellow (Summer 2025)">
          <ul style={styles.list}>
            <li style={styles.listItem}>Implemented a GAN generator-detector pipeline for manipulated real-estate listing detection.</li>
            <li style={styles.listItem}>Evaluated model bias and auditing strategies in housing-equity contexts.</li>
          </ul>
        </Fieldset>

        <Fieldset legend="Other Roles">
          <ul style={styles.list}>
            <li style={styles.listItem}>Olin Teaching Assistant - Designing with Emerging Technology: Generative AI (Fall 2025)</li>
            <li style={styles.listItem}>MIT PRIMES / Mirny Lab - Research Student (Feb 2023 - Jan 2024)</li>
            <li style={styles.listItem}>Sanofi - Research Intern, Molecular Oncology (Summer 2022)</li>
          </ul>
        </Fieldset>
        </div>
      </Tab>

      <Tab title="Awards">
        <div style={styles.page} className="resume-page">
        <Fieldset legend="Grants and Fellowships">
          <ul style={styles.list}>
            <li style={styles.listItem}>Student Academic Grant (SAG), Olin College of Engineering - Principal Author (2025)</li>
            <li style={styles.listItem}>Presidential Innovation Grant - Principal Author (2025)</li>
            <li style={styles.listItem}>Ashoka Youth Venturer (2025)</li>
          </ul>
        </Fieldset>

        <Fieldset legend="National and International Honors">
          <ul style={styles.list}>
            <li style={styles.listItem}>3M Discovery Channel: America&apos;s Top Ten Young Scientists (2018)</li>
            <li style={styles.listItem}>Davidson Fellows Scholarship (2023)</li>
            <li style={styles.listItem}>Gloria Barron Prize for Young Heroes (2019)</li>
            <li style={styles.listItem}>MIT Lincoln Laboratory Minor Planet Award - Minor Planet &quot;Annadu&quot; (ID 34331) (2019)</li>
          </ul>
        </Fieldset>

        <Fieldset legend="Science Fairs and Competitions">
          <ul style={styles.list}>
            <li style={styles.listItem}>Regeneron Science Talent Search, Top 300 Scholar (2024)</li>
            <li style={styles.listItem}>Regeneron ISEF, Grand Prize - Third Place (2021)</li>
            <li style={styles.listItem}>Broadcom MASTERS, National Top 30 Finalist (2018, 2019)</li>
            <li style={styles.listItem}>JSHS National Oral Finalist (2021, 2022); First Place, New England Region (2022)</li>
            <li style={styles.listItem}>Massachusetts Science and Engineering Fair - Cabot Grand Prize (2019)</li>
            <li style={styles.listItem}>Sanofi Genzyme Top Grand Award (2021)</li>
            <li style={styles.listItem}>National Geographic: That&apos;s Geography Award (2022)</li>
            <li style={styles.listItem}>Brace Fellow, Phillips Academy (2024)</li>
          </ul>
        </Fieldset>
        </div>
      </Tab>

      <Tab title="Publications">
        <div style={styles.page} className="resume-page">
        <Fieldset legend="Conference Papers and Preprints">
          <ul style={styles.list}>
            <li style={styles.listItem}>Depth-Informed Transformer Keypoint Selection for Underwater Visual Reconstruction (IEEE OCEANS 2026, accepted)</li>
            <li style={styles.listItem}>Linguistic Bias in Automatic Speech Recognition for People Who Stutter (AAAS 2025, poster accepted)</li>
            <li style={styles.listItem}>CHARMM Molecular Simulation Observations of Carbonaceous Materials as Possible Templates for Prebiotic Nucleic Acid Oligomer Formation (ChemRxiv, 2024)</li>
          </ul>
        </Fieldset>

        <Fieldset legend="Books and Educational Publications">
          <ul style={styles.list}>
            <li style={styles.listItem}>I Am Anna Du, the Microplastics Girl (Benchmark Education, 2022)</li>
            <li style={styles.listItem}>Microplastics and Me (Tumblehome Learning, 2020)</li>
          </ul>
        </Fieldset>
        </div>
      </Tab>

      <Tab title="Activities">
        <div style={styles.page} className="resume-page">
        <Fieldset legend="Ideas Become Impact (IBI)">
          <p>Founder and Executive Director | 2025 - Present</p>
          <p>
            Founded a nonprofit delivering hands-on AI and STEM education to underserved youth
            through libraries and community organizations.
          </p>
        </Fieldset>

        <Fieldset legend="Student Government and Technical Organizations, Olin">
          <ul style={styles.list}>
            <li style={styles.listItem}>SERV - Finance Lead</li>
            <li style={styles.listItem}>Assistive Technology Lab - Founding Member, Software Subteam</li>
            <li style={styles.listItem}>Rocketry - Structures Team, Lead-in-Training</li>
          </ul>
        </Fieldset>

        <Fieldset legend="Community Service and Presentations">
          <ul style={styles.list}>
            <li style={styles.listItem}>STEM Outreach and Educational Engagement (2018 - Present)</li>
            <li style={styles.listItem}>Andover Green Advisory Board - Board Member (2022 - 2024)</li>
            <li style={styles.listItem}>Plenary Speaker at the 2025 Robotics Expo, Olin College</li>
            <li style={styles.listItem}>Keynote Speaker at the 2019 Worldskills Conference, Kazan, Russia</li>
            <li style={styles.listItem}>Keynote Speaker at the 2019 Czech Innovation Week, Prague, Czech Republic</li>
            <li style={styles.listItem}>Keynote Speaker at the 2019 Raise Her Voice Conference, NJ, USA</li>
          </ul>
        </Fieldset>
        </div>
      </Tab>
    </Tabs>
  )
}

export default Resume
