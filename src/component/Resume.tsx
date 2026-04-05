import { Fieldset, Tab, Tabs } from '@react95/core'
import { useI18n } from '../i18n'

const styles = {
  page: {
    display: 'grid',
    gap: '12px',
    lineHeight: 1.55,
  } as const,
  list: {
    margin: '8px 0 0 0',
    paddingLeft: '18px',
  } as const,
  listItem: {
    marginBottom: '8px',
  } as const,
} as const

const resumeContent = {
  en: {
    tabs: {
      overview: 'Overview',
      experience: 'Experience',
      awards: 'Awards',
      publications: 'Publications',
      activities: 'Activities',
    },
    name: 'Anna Du',
    educationLegend: 'Education',
    school: 'Olin College of Engineering, Needham, MA | Expected Grad: May 2028 | GPA: 3.9/4.0',
    degree: 'B.S. Electrical and Computer Engineering',
    experience: [
      {
        legend: 'Chimera Research - AI Engineer (Jan 2026 - Present)',
        items: [
          'Built AI agent infrastructure for test generation, documentation, and validation in CI/CD.',
          'Designed cluster-based execution systems for scalable agent workflows and benchmarking.',
          'Developed platform/simulator interfaces (Modal) for large-scale scientific and ML pipelines.',
        ],
      },
      {
        legend: 'Center for Science Engagement - AI Research Fellow (Summer 2023 - Present)',
        items: [
          'Conducted physical AI research in Project CANVAS (Mass Cultural Council-supported program).',
          'Designed and evaluated ML interventions integrating sensing, perception, and interaction.',
          'Developed curricula and assessments grounded in computational and scientific literacy.',
        ],
      },
      {
        legend: 'CREST Lab, Olin - Undergraduate Researcher (Jan 2025 - Present)',
        items: [
          'Developed a transformer-based vision pipeline for static geologic feature analysis from AUV data.',
          'Built modular sensing and control software with real-time signal processing for AUV deployment.',
          'Paper accepted to the IEEE OCEANS 2026 regular technical track.',
        ],
      },
      {
        legend: 'PIT-NE / NFHA + BU - Artificial Intelligence Fellow (Summer 2025)',
        items: [
          'Implemented a GAN generator-detector pipeline for manipulated real-estate listing detection.',
          'Evaluated model bias and auditing strategies in housing-equity contexts.',
        ],
      },
      {
        legend: 'Other Roles',
        items: [
          'Olin Teaching Assistant - Designing with Emerging Technology: Generative AI (Fall 2025)',
          'MIT PRIMES / Mirny Lab - Research Student (Feb 2023 - Jan 2024)',
          'Sanofi - Research Intern, Molecular Oncology (Summer 2022)',
        ],
      },
    ],
    awards: [
      {
        legend: 'Grants and Fellowships',
        items: [
          'Student Academic Grant (SAG), Olin College of Engineering - Principal Author (2025)',
          'Presidential Innovation Grant - Principal Author (2025)',
          'Ashoka Youth Venturer (2025)',
        ],
      },
      {
        legend: 'National and International Honors',
        items: [
          "3M Discovery Channel: America's Top Ten Young Scientists (2018)",
          'Davidson Fellows Scholarship (2023)',
          'Gloria Barron Prize for Young Heroes (2019)',
          'MIT Lincoln Laboratory Minor Planet Award - Minor Planet "Annadu" (ID 34331) (2019)',
        ],
      },
      {
        legend: 'Science Fairs and Competitions',
        items: [
          'Regeneron Science Talent Search, Top 300 Scholar (2024)',
          'Regeneron ISEF, Grand Prize - Third Place (2021)',
          'Broadcom MASTERS, National Top 30 Finalist (2018, 2019)',
          'JSHS National Oral Finalist (2021, 2022); First Place, New England Region (2022)',
          'Massachusetts Science and Engineering Fair - Cabot Grand Prize (2019)',
          'Sanofi Genzyme Top Grand Award (2021)',
          "National Geographic: That's Geography Award (2022)",
          'Brace Fellow, Phillips Academy (2024)',
        ],
      },
    ],
    publications: [
      {
        legend: 'Conference Papers and Preprints',
        items: [
          'Depth-Informed Transformer Keypoint Selection for Underwater Visual Reconstruction (IEEE OCEANS 2026, accepted)',
          'Linguistic Bias in Automatic Speech Recognition for People Who Stutter (AAAS 2025, poster accepted)',
          'CHARMM Molecular Simulation Observations of Carbonaceous Materials as Possible Templates for Prebiotic Nucleic Acid Oligomer Formation (ChemRxiv, 2024)',
        ],
      },
      {
        legend: 'Books and Educational Publications',
        items: [
          'I Am Anna Du, the Microplastics Girl (Benchmark Education, 2022)',
          'Microplastics and Me (Tumblehome Learning, 2020)',
        ],
      },
    ],
    activities: {
      ibi: {
        legend: 'Ideas Become Impact (IBI)',
        title: 'Founder and Executive Director | 2025 - Present',
        description:
          'Founded a nonprofit delivering hands-on AI and STEM education to underserved youth through libraries and community organizations.',
      },
      organizations: {
        legend: 'Student Government and Technical Organizations, Olin',
        items: [
          'SERV - Finance Lead',
          'Assistive Technology Lab - Founding Member, Software Subteam',
          'Rocketry - Structures Team, Lead-in-Training',
        ],
      },
      service: {
        legend: 'Community Service and Presentations',
        items: [
          'STEM Outreach and Educational Engagement (2018 - Present)',
          'Andover Green Advisory Board - Board Member (2022 - 2024)',
          'Plenary Speaker at the 2025 Robotics Expo, Olin College',
          'Keynote Speaker at the 2019 Worldskills Conference, Kazan, Russia',
          'Keynote Speaker at the 2019 Czech Innovation Week, Prague, Czech Republic',
          'Keynote Speaker at the 2019 Raise Her Voice Conference, NJ, USA',
        ],
      },
    },
  },
  zh: {
    tabs: {
      overview: '概览',
      experience: '经历',
      awards: '奖项',
      publications: '出版物',
      activities: '活动',
    },
    name: 'Anna Du',
    educationLegend: '教育背景',
    school: '奥林工程学院，马萨诸塞州尼达姆 | 预计毕业时间：2028年5月 | GPA：3.9/4.0',
    degree: '电气与计算机工程理学学士',
    experience: [
      {
        legend: 'Chimera Research - AI 工程师（2026年1月 - 至今）',
        items: [
          '构建用于测试生成、文档编写和 CI/CD 验证的 AI 智能体基础设施。',
          '设计基于集群的执行系统，以支持可扩展的智能体工作流和基准测试。',
          '开发面向大规模科学计算和机器学习流程的平台与模拟器接口（Modal）。',
        ],
      },
      {
        legend: 'Center for Science Engagement - AI 研究员（2023年夏季 - 至今）',
        items: [
          '在 Project CANVAS 中开展具身 AI 研究，该项目获马萨诸塞文化委员会支持。',
          '设计并评估融合传感、感知与交互的机器学习干预方案。',
          '开发以计算素养和科学素养为基础的课程与评估材料。',
        ],
      },
      {
        legend: 'Olin CREST Lab - 本科研究员（2025年1月 - 至今）',
        items: [
          '开发基于 Transformer 的视觉流程，用于分析 AUV 数据中的静态地质特征。',
          '构建具备实时信号处理能力的模块化传感与控制软件，用于 AUV 部署。',
          '论文已被 IEEE OCEANS 2026 常规技术轨道接收。',
        ],
      },
      {
        legend: 'PIT-NE / NFHA + BU - 人工智能研究员（2025年夏季）',
        items: [
          '实现用于识别被篡改房地产房源信息的 GAN 生成器-检测器流程。',
          '在住房公平场景下评估模型偏差与审计策略。',
        ],
      },
      {
        legend: '其他角色',
        items: [
          'Olin 助教 - 新兴技术设计：生成式 AI（2025年秋季）',
          'MIT PRIMES / Mirny Lab - 研究学生（2023年2月 - 2024年1月）',
          '赛诺菲 - 分子肿瘤学研究实习生（2022年夏季）',
        ],
      },
    ],
    awards: [
      {
        legend: '资助与奖学金',
        items: [
          '学生学术资助（SAG），奥林工程学院 - 主要作者（2025）',
          '总统创新基金 - 主要作者（2025）',
          'Ashoka 青年创变者（2025）',
        ],
      },
      {
        legend: '国家级与国际荣誉',
        items: [
          '3M Discovery Channel：全美十大青年科学家（2018）',
          'Davidson Fellows Scholarship（2023）',
          'Gloria Barron Prize for Young Heroes（2019）',
          'MIT 林肯实验室小行星奖 - 小行星 "Annadu"（编号 34331）（2019）',
        ],
      },
      {
        legend: '科学竞赛与展会',
        items: [
          'Regeneron Science Talent Search，Top 300 Scholar（2024）',
          'Regeneron ISEF，大奖三等奖（2021）',
          'Broadcom MASTERS，全美 Top 30 决赛入围者（2018，2019）',
          'JSHS 全国口头报告决赛入围者（2021，2022）；新英格兰赛区第一名（2022）',
          '马萨诸塞州科学与工程展 - Cabot 大奖（2019）',
          'Sanofi Genzyme 最高大奖（2021）',
          'National Geographic：That\'s Geography Award（2022）',
          'Brace Fellow，Phillips Academy（2024）',
        ],
      },
    ],
    publications: [
      {
        legend: '会议论文与预印本',
        items: [
          'Depth-Informed Transformer Keypoint Selection for Underwater Visual Reconstruction（IEEE OCEANS 2026，已接收）',
          'Linguistic Bias in Automatic Speech Recognition for People Who Stutter（AAAS 2025，海报已接收）',
          'CHARMM Molecular Simulation Observations of Carbonaceous Materials as Possible Templates for Prebiotic Nucleic Acid Oligomer Formation（ChemRxiv，2024）',
        ],
      },
      {
        legend: '书籍与教育出版物',
        items: [
          'I Am Anna Du, the Microplastics Girl（Benchmark Education，2022）',
          'Microplastics and Me（Tumblehome Learning，2020）',
        ],
      },
    ],
    activities: {
      ibi: {
        legend: 'Ideas Become Impact（IBI）',
        title: '创始人兼执行董事 | 2025 - 至今',
        description:
          '创办非营利组织，通过图书馆和社区机构向资源不足的青少年提供动手式 AI 与 STEM 教育。',
      },
      organizations: {
        legend: 'Olin 学生组织与技术社团',
        items: [
          'SERV - 财务负责人',
          'Assistive Technology Lab - 创始成员，软件小组',
          'Rocketry - 结构组，Lead-in-Training',
        ],
      },
      service: {
        legend: '社区服务与演讲',
        items: [
          'STEM 科普与教育推广（2018 - 至今）',
          'Andover Green Advisory Board - 董事会成员（2022 - 2024）',
          '2025 年 Olin College Robotics Expo 大会主讲人',
          '2019 年 Worldskills Conference（俄罗斯喀山）主题演讲人',
          '2019 年 Czech Innovation Week（捷克布拉格）主题演讲人',
          '2019 年 Raise Her Voice Conference（美国新泽西）主题演讲人',
        ],
      },
    },
  },
} as const

function Resume() {
  const { language } = useI18n()
  const content = resumeContent[language]

  return (
    <Tabs defaultActiveTab={content.tabs.overview}>
      <Tab title={content.tabs.overview}>
        <div style={styles.page} className="resume-page">
          <h3 style={{ margin: 0, fontWeight: 700 }}>{content.name}</h3>
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

          <Fieldset legend={content.educationLegend}>
            <p>{content.school}</p>
            <p style={{ marginTop: '8px' }}>{content.degree}</p>
          </Fieldset>
        </div>
      </Tab>

      <Tab title={content.tabs.experience}>
        <div style={styles.page} className="resume-page">
          {content.experience.map((section) => (
            <Fieldset key={section.legend} legend={section.legend}>
              <ul style={styles.list}>
                {section.items.map((item) => (
                  <li key={item} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </Fieldset>
          ))}
        </div>
      </Tab>

      <Tab title={content.tabs.awards}>
        <div style={styles.page} className="resume-page">
          {content.awards.map((section) => (
            <Fieldset key={section.legend} legend={section.legend}>
              <ul style={styles.list}>
                {section.items.map((item) => (
                  <li key={item} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </Fieldset>
          ))}
        </div>
      </Tab>

      <Tab title={content.tabs.publications}>
        <div style={styles.page} className="resume-page">
          {content.publications.map((section) => (
            <Fieldset key={section.legend} legend={section.legend}>
              <ul style={styles.list}>
                {section.items.map((item) => (
                  <li key={item} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </Fieldset>
          ))}
        </div>
      </Tab>

      <Tab title={content.tabs.activities}>
        <div style={styles.page} className="resume-page">
          <Fieldset legend={content.activities.ibi.legend}>
            <p>{content.activities.ibi.title}</p>
            <p>{content.activities.ibi.description}</p>
          </Fieldset>

          <Fieldset legend={content.activities.organizations.legend}>
            <ul style={styles.list}>
              {content.activities.organizations.items.map((item) => (
                <li key={item} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </Fieldset>

          <Fieldset legend={content.activities.service.legend}>
            <ul style={styles.list}>
              {content.activities.service.items.map((item) => (
                <li key={item} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </Fieldset>
        </div>
      </Tab>
    </Tabs>
  )
}

export default Resume
