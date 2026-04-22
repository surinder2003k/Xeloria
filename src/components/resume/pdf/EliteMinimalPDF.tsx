import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/store";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    backgroundColor: "#FAF9F6",
    color: "#1c1c1c",
    padding: 60,
    flexDirection: "column",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 40,
    fontWeight: 500,
    color: "#111111",
    marginBottom: 10,
    textTransform: "lowercase",
  },
  jobTitle: {
    fontSize: 10,
    color: "#555555",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 8,
    color: "#666666",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.8,
    color: "#444444",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeadingCont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#888888",
    marginRight: 15,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eaeaea",
  },
  expRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  expDateCol: {
    width: 100,
  },
  expDate: {
    fontSize: 8,
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  expContent: {
    flex: 1,
  },
  expTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  expPosition: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111111",
    marginRight: 10,
  },
  expCompany: {
    fontSize: 9,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#555555",
  },
  twoCol: {
    flexDirection: "row",
    marginTop: 10,
  },
  col: {
    flex: 1,
    paddingRight: 20,
  },
  eduItem: {
    marginBottom: 15,
  },
  eduDegree: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111111",
    marginBottom: 4,
  },
  eduSchool: {
    fontSize: 9,
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  eduDate: {
    fontSize: 8,
    color: "#999999",
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  skillItem: {
    fontSize: 9,
    color: "#444444",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  projGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  projItem: {
    width: "48%",
    marginRight: "2%",
    marginBottom: 20,
  },
  projName: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111111",
    marginBottom: 6,
  },
  projDesc: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#555555",
    marginBottom: 6,
  },
  projTech: {
    fontSize: 7,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1,
  }
});

export const EliteMinimalPDF = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.name}>{data.personalInfo.fullName || "Your Name"}</Text>
      <Text style={styles.jobTitle}>{data.personalInfo.jobTitle || "Professional Title"}</Text>
      
      <View style={styles.contactRow}>
        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
        {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
        {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
      </View>
    </View>

    {data.summary && (
      <Text style={styles.summaryText}>{data.summary}</Text>
    )}

    {data.experience?.length > 0 && (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.sectionHeadingCont}>
          <Text style={styles.sectionHeading}>Experience</Text>
          <View style={styles.sectionLine} />
        </View>
        
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.expRow}>
            <View style={styles.expDateCol}>
              <Text style={styles.expDate}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
            </View>
            <View style={styles.expContent}>
              <View style={styles.expTitleRow}>
                <Text style={styles.expPosition}>{exp.position}</Text>
                <Text style={styles.expCompany}>{exp.company}</Text>
              </View>
              <Text style={styles.expDesc}>{exp.description}</Text>
            </View>
          </View>
        ))}
      </View>
    )}

    <View style={styles.twoCol}>
      {data.education?.length > 0 && (
        <View style={styles.col}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionHeading}>Education</Text>
          </View>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.eduItem}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduSchool}>{edu.school}</Text>
              <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate}</Text>
            </View>
          ))}
        </View>
      )}

      {data.skills?.length > 0 && (
        <View style={styles.col}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionHeading}>Expertise</Text>
          </View>
          <View style={styles.skillsWrap}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                {skill.category}: {skill.items.join(", ")}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>

    {data.projects?.length > 0 && (
      <View style={{ marginTop: 20 }}>
        <View style={styles.sectionHeadingCont}>
          <Text style={styles.sectionHeading}>Selected Works</Text>
          <View style={styles.sectionLine} />
        </View>
        
        <View style={styles.projGrid}>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.projItem}>
              <Text style={styles.projName}>{proj.name}</Text>
              <Text style={styles.projDesc}>{proj.description}</Text>
              <Text style={styles.projTech}>
                {(proj.technologies && proj.technologies.length > 0) ? proj.technologies.join(" · ") : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )}
  </Page>
);
