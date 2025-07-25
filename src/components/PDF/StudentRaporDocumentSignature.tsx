import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

interface Grade {
  id: string
  subject: { title: string }
  score: number
  class?: { name: string }
  school_year: string
  semester: number
}

interface Props {
  studentName: string
  nisn: string
  className: string
  schoolYear: string
  semester: number
  grades: Grade[]
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  headerSection: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 10,
    marginBottom: 2,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 25,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cellNo: {
    width: 30,
    minWidth: 30,
  },
  cellSubject: {
    flex: 2,
    textAlign: "left",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  cellScore: {
    width: 60,
    minWidth: 60,
  },
  cellGrade: {
    width: 60,
    minWidth: 60,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  signatureTitle: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 50,
    textAlign: "center",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "80%",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 10,
    textAlign: "center",
  },
})

const StudentRaporDocumentSignature = ({ studentName, nisn, className, schoolYear, semester, grades }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Rapor Nilai Siswa</Text>

      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Kelas: {className}</Text>
            <Text style={styles.headerText}>Wali Kelas: -</Text>
            <Text style={styles.headerText}>
              Tahun Ajaran / Semester: {schoolYear} - Semester {semester}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Nama Siswa: {studentName}</Text>
            <Text style={styles.headerText}>NIS: {nisn}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.cell, styles.cellNo]}>
            <Text>No</Text>
          </View>
          <View style={[styles.cell, styles.cellSubject]}>
            <Text>Mata Pelajaran</Text>
          </View>
          <View style={[styles.cell, styles.cellScore]}>
            <Text>KKM</Text>
          </View>
          <View style={[styles.cell, styles.cellScore]}>
            <Text>Kognitif</Text>
          </View>
          <View style={[styles.cell, styles.cellGrade, styles.lastCell]}>
            <Text>Afektif</Text>
          </View>
        </View>

        {/* Table Rows */}
        {grades.map((grade, idx) => (
          <View style={styles.tableRow} key={grade.id}>
            <View style={[styles.cell, styles.cellNo]}>
              <Text>{idx + 1}</Text>
            </View>
            <View style={[styles.cell, styles.cellSubject]}>
              <Text>{grade.subject.title}</Text>
            </View>
            <View style={[styles.cell, styles.cellScore]}>
              <Text>75</Text>
            </View>
            <View style={[styles.cell, styles.cellScore]}>
              <Text>{grade.score}</Text>
            </View>
            <View style={[styles.cell, styles.cellGrade, styles.lastCell]}>
              <Text>{grade.score >= 85 ? "A" : grade.score >= 75 ? "B" : grade.score >= 60 ? "C" : "D"}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureTitle}>Guru Kelas</Text>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureName}>(_____________________)</Text>
        </View>

        <View style={styles.signatureBox}>
          <Text style={styles.signatureTitle}>Orang Tua/Wali</Text>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureName}>(_____________________)</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default StudentRaporDocumentSignature
