import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },

  info: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 12,
  },

  section: {
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    paddingBottom: 2,
    marginBottom: 4,
  },

  // ✅ GLOBAL INDENTATION FOR ALL SECTIONS
  sectionContent: {
    paddingLeft: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 10,
    marginBottom: 2,
  },

  bullet: {
    fontSize: 10,
    marginLeft: 8,
  },
});

export function buildResumeDocument(data: any) {
  const p = data.personal ?? {};

  const fullName =
    `${p.firstName ?? ""} ${p.middleName ?? ""} ${p.lastName ?? ""}`.trim() ||
    "Anonymous";

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <Text style={styles.name}>{fullName}</Text>

        {p.role && <Text style={styles.subtitle}>{p.role}</Text>}

        <Text style={styles.info}>
          {[p.email, p.phone, p.address].filter(Boolean).join(" • ")}
        </Text>

        {/* ================= SUMMARY ================= */}
        {p.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.text}>{p.summary}</Text>
            </View>
          </View>
        )}

        {/* ================= EXPERIENCE ================= */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>

            <View style={styles.sectionContent}>
              {data.experience.map((e: any, i: number) => (
                <View key={i} style={{ marginBottom: 10 }}>

                  <Text style={{ fontWeight: "bold" }}>
                    {e.company}
                  </Text>

                  <View style={styles.row}>
                    <Text style={styles.text}>{e.role}</Text>
                    <Text style={styles.text}>
                      {e.startDate} - {e.currentlyWorking ? "Present" : e.endDate}
                    </Text>
                  </View>

                  {e.location && (
                    <Text style={styles.text}>{e.location}</Text>
                  )}

                  {e.bullets?.map((b: string, idx: number) => (
                    <Text key={idx} style={styles.bullet}>
                      • {b}
                    </Text>
                  ))}

                </View>
              ))}
            </View>
          </View>
        )}

        {/* ================= EDUCATION ================= */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            <View style={styles.sectionContent}>
              {data.education.map((e: any, i: number) => (
                <View key={i} style={{ marginBottom: 10 }}>

                  <View style={styles.row}>
                    <Text style={{ fontWeight: "bold" }}>
                      {e.school}
                    </Text>
                    <Text style={styles.text}>
                      {e.startYear} - {e.endYear}
                    </Text>
                  </View>

                  <Text style={styles.text}>
                    {e.degree} {e.field ? `- ${e.field}` : ""}
                  </Text>

                  {e.achievements?.length > 0 && (
                    <Text style={styles.text}>
                      {e.achievements.join(" • ")}
                    </Text>
                  )}

                </View>
              ))}
            </View>
          </View>
        )}

        {/* ================= SKILLS ================= */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            <View style={styles.sectionContent}>
              {data.skills.map((s: any, i: number) => (
                <Text key={i} style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>
                    {s.category}
                  </Text>
                  : {s.skills?.join(", ")}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* ================= PROJECTS ================= */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>

            <View style={styles.sectionContent}>
              {data.projects.map((p: any, i: number) => (
                <View key={i} style={{ marginBottom: 10 }}>

                  <Text style={{ fontWeight: "bold" }}>
                    {p.title}
                  </Text>

                  {p.description && (
                    <Text style={styles.text}>
                      {p.description}
                    </Text>
                  )}

                  {p.technologies?.length > 0 && (
                    <Text style={styles.text}>
                      Tech: {p.technologies.join(", ")}
                    </Text>
                  )}

                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}