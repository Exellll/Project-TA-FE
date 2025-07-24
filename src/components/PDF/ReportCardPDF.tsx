import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

type Grade = {
  subject: string;
  kkm: number;
  kognitif: number;
  afektif: string;
};

type ReportCardProps = {
  studentName: string;
  grades: Grade[];
};

const styles = StyleSheet.create({
  page: { padding: 24 },
  title: { fontSize: 16, textAlign: "center", marginBottom: 12 },
  table: { width: "100%", borderWidth: 1, borderColor: "#000" },
  row: { flexDirection: "row" },
  cellHeader: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 6,
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    flexGrow: 1,
  },
  cell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    flexGrow: 1,
  },
});

const ReportCardPDF: React.FC<ReportCardProps> = ({ studentName, grades }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>RAPOR SISWA</Text>
      <Text style={{ marginBottom: 8 }}>Nama: {studentName}</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cellHeader, { flexGrow: 2 }]}>Mata Pelajaran</Text>
          <Text style={styles.cellHeader}>KKM</Text>
          <Text style={styles.cellHeader}>Kognitif</Text>
          <Text style={styles.cellHeader}>Afektif</Text>
        </View>
        {grades.map((grade: Grade, idx: number) => (
          <View key={idx} style={styles.row}>
            <Text style={[styles.cell, { flexGrow: 2 }]}>{grade.subject}</Text>
            <Text style={styles.cell}>{grade.kkm}</Text>
            <Text style={styles.cell}>{grade.kognitif}</Text>
            <Text style={styles.cell}>{grade.afektif}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportCardPDF;
