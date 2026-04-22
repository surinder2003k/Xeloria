import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/store";

// Using standard fonts (Helvetica, Times-Roman, Courier) to avoid network fetch issues.
// Built-in fonts don't require external downloads and are 100% stable.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#4f46e5",
    paddingBottom: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
    textTransform: "uppercase",
  },
  jobTitle: {
    fontSize: 12,
    color: "#4f46e5",
    fontWeight: 700,
    marginTop: 4,
    textTransform: "uppercase",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    fontSize: 8,
    color: "#64748b",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#4f46e5",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 4,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f172a",
  },
  itemSubtitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#4f46e5",
  },
  date: {
    fontSize: 8,
    color: "#94a3b8",
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    marginTop: 2,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8,
    color: "#475569",
  },
});

import { EliteModernPDF } from "./pdf/EliteModernPDF";
import { EliteMinimalPDF } from "./pdf/EliteMinimalPDF";

export const GenericPDF = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.name}>{data.personalInfo.fullName || "Your Name"}</Text>
        <Text style={styles.jobTitle}>{data.personalInfo.jobTitle || "Job Title"}</Text>
      </View>
    </View>

    <View style={styles.contactRow}>
      {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
      {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
      {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
      {data.personalInfo.website && <Text>• {data.personalInfo.website}</Text>}
      {data.personalInfo.github && <Text>• {data.personalInfo.github}</Text>}
    </View>

    {data.summary && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>{data.summary}</Text>
      </View>
    )}

    {data.experience?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.date}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
            </View>
            <Text style={styles.itemSubtitle}>{exp.company}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.education?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
            </View>
            <Text style={styles.itemSubtitle}>{edu.school}</Text>
            {edu.description && <Text style={styles.description}>{edu.description}</Text>}
          </View>
        ))}
      </View>
    )}

    {data.skills?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsList}>
          {data.skills.map((skill, i) => (
            <View key={i} style={styles.skillBadge}>
              <Text>{skill.category}: {skill.items.join(", ")}</Text>
            </View>
          ))}
        </View>
      </View>
    )}

    {data.projects?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((proj, i) => (
          <View key={i} style={styles.experienceItem}>
            <Text style={styles.itemTitle}>{proj.name}</Text>
            <Text style={styles.description}>{proj.description}</Text>
          </View>
        ))}
      </View>
    )}
  </Page>
);

export const ResumePDF = ({ data, templateId }: { data: ResumeData; templateId?: string }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case "elite_modern":
        return <EliteModernPDF data={data} />;
      case "elite_minimal":
        return <EliteMinimalPDF data={data} />;
      default:
        return <GenericPDF data={data} />;
    }
  };

  return <Document>{renderTemplate()}</Document>;
};
