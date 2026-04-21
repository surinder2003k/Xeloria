import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/store";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#fcfdfd",
    color: "#1e293b",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#0f172a",
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextCont: {
    maxWidth: "75%",
  },
  name: {
    fontSize: 32,
    fontWeight: 900,
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  jobTitleCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 12,
    color: "#d4af37",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: "#d4af37",
    marginLeft: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d4af37",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "32%",
    backgroundColor: "#1e293b",
    padding: 25,
    color: "#cbd5e1",
  },
  body: {
    width: "68%",
    backgroundColor: "#ffffff",
    padding: 30,
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
  },
  sidebarSectionHeading: {
    fontSize: 9,
    fontWeight: 900,
    color: "#d4af37",
    textTransform: "uppercase",
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
    paddingBottom: 4,
    marginBottom: 12,
  },
  sidebarText: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 600,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8,
    fontWeight: 700,
    color: "#f1f5f9",
    textTransform: "uppercase",
  },
  eduItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#475569",
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 900,
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 8,
    fontWeight: 700,
    color: "#94a3b8",
    marginBottom: 2,
  },
  eduDate: {
    fontSize: 7,
    fontWeight: 600,
    color: "#d4af37",
  },
  bodyHeading: {
    fontSize: 14,
    fontWeight: 900,
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 5,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
    marginBottom: 20,
  },
  expItem: {
    marginBottom: 15,
  },
  expHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 12,
    fontWeight: 900,
    color: "#0f172a",
    textTransform: "uppercase",
  },
  expDate: {
    fontSize: 7,
    fontWeight: 700,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "3 6",
    textTransform: "uppercase",
  },
  expCompany: {
    fontSize: 8,
    fontWeight: 700,
    color: "#d4af37",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
  },
  projItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  projName: {
    fontSize: 10,
    fontWeight: 900,
    color: "#0f172a",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  projDesc: {
    fontSize: 8,
    color: "#475569",
    lineHeight: 1.4,
  }
});

export const EliteModernPDF = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <View style={styles.headerTextCont}>
        <Text style={styles.name}>{data.personalInfo.fullName || "YOUR NAME"}</Text>
        <View style={styles.jobTitleCont}>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle || "EXECUTIVE PROFESSIONAL"}</Text>
          <View style={styles.line} />
        </View>
      </View>
      {data.personalInfo.avatar && (
        <Image src={data.personalInfo.avatar} style={styles.avatar} />
      )}
    </View>

    <View style={styles.mainContent}>
      <View style={styles.sidebar}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sidebarSectionHeading}>Contact</Text>
          {data.personalInfo.email && <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>}
          {data.personalInfo.github && <Text style={styles.sidebarText}>{data.personalInfo.github}</Text>}
        </View>

        {data.skills?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sidebarSectionHeading}>Expertise</Text>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillRow}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        )}

        {data.education?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
             <Text style={styles.sidebarSectionHeading}>Education</Text>
             {data.education.map((edu, i) => (
               <View key={i} style={styles.eduItem}>
                 <Text style={styles.eduDegree}>{edu.degree}</Text>
                 <Text style={styles.eduSchool}>{edu.school}</Text>
                 <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate}</Text>
               </View>
             ))}
          </View>
        )}
      </View>

      <View style={styles.body}>
        {data.summary && (
          <View>
            <Text style={styles.bodyHeading}>Profile</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience?.length > 0 && (
          <View>
            <Text style={styles.bodyHeading}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  <Text style={styles.expDate}>{exp.startDate} - {exp.current ? "PRESENT" : exp.endDate}</Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expDesc}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.projects?.length > 0 && (
          <View>
            <Text style={styles.bodyHeading}>Key Initiatives</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.projItem}>
                <Text style={styles.projName}>{proj.name}</Text>
                <Text style={styles.projDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  </Page>
);
