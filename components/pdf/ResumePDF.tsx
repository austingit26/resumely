import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },

  section: {
    marginBottom: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  text: {
    fontSize: 11,
  },

  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  box: {
    marginBottom: 8,
  },

  label: {
    fontWeight: 700,
  },
});

export default function ResumePDF({ resume }: any) {
  const {
    sectionOrder,
    personal,
    experience,
    education,
    skills,
    projects,
  } = resume;

  const renderPersonal = () => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Personal Information</Text>

      <Text style={styles.text}>
        {personal.firstName} {personal.middleName} {personal.lastName}
      </Text>

      <Text style={styles.text}>
        {personal.email} | {personal.phone}
      </Text>

      <Text style={{ marginTop: 6 }}>
        {personal.summary}
      </Text>
    </View>
  );

  const renderExperience = () => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Experience</Text>

      {experience?.map((exp: any, i: number) => (
        <View key={i} style={styles.box}>
          <Text style={styles.label}>
            {exp.company} - {exp.role}
          </Text>

          <Text style={styles.text}>
            {exp.location}
          </Text>

          <Text style={styles.text}>
            {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
          </Text>

          {exp.bullets?.map((b: string, idx: number) => (
            <Text key={idx}>• {b}</Text>
          ))}
        </View>
      ))}
    </View>
  );

  const renderEducation = () => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Education</Text>

      {education?.map((edu: any, i: number) => (
        <View key={i} style={styles.box}>
          <Text style={styles.label}>
            {edu.school}
          </Text>

          <Text>
            {edu.degree} - {edu.field}
          </Text>

          <Text>
            {edu.startYear} - {edu.endYear}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderSkills = () => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Skills</Text>

      {skills?.map((cat: any, i: number) => (
        <Text key={i}>
          {cat.category}: {cat.skills?.join(', ')}
        </Text>
      ))}
    </View>
  );

  const renderProjects = () => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Projects</Text>

      {projects?.map((p: any, i: number) => (
        <View key={i} style={styles.box}>
          <Text style={styles.label}>{p.title}</Text>
          <Text>{p.description}</Text>
          <Text>{p.technologies?.join(', ')}</Text>
          <Text>{p.link}</Text>
        </View>
      ))}
    </View>
  );

  const mapSection = (section: string) => {
    switch (section) {
      case 'personal':
        return renderPersonal();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SECTIONS (same order as preview) */}
        {sectionOrder.map((section: string) => (
          <View key={section}>
            {mapSection(section)}
          </View>
        ))}

      </Page>
    </Document>
  );
}