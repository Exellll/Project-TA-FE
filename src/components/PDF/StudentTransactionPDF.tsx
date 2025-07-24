import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

Font.register({
    family: "Times-Roman",
    src: "https://fonts.gstatic.com/s/tinos/v21/buE3po6gcdjy0EiZMBUG6w.woff2",
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Times-Roman",
        fontSize: 12,
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
    },
    cell: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderColor: "#000",
    },
    lastCell: {
        flex: 1,
        padding: 5,
    },
    tableHeader: {
        backgroundColor: "#8ac7ff",
        color: "black",
        fontWeight: "bold",
    },
    totalRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#f1f1f1",
    },
});

const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};


const StudentTransactionPDF = ({
    data,
    month,
}: {
    data: any[];
    month: string;
}) => {
    const monthNames = {
        "01": "Januari",
        "02": "Februari",
        "03": "Maret",
        "04": "April",
        "05": "Mei",
        "06": "Juni",
        "07": "Juli",
        "08": "Agustus",
        "09": "September",
        "10": "Oktober",
        "11": "November",
        "12": "Desember",
    };

    const totalAmount = data.reduce(
        (acc, item) => acc + (item.student_bill.bill_amount || 0),
        0
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>
                    Laporan Transaksi SPP Bulan {monthNames[month as keyof typeof monthNames]}
                </Text>

                {/* Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.cell}>No</Text>
                    <Text style={styles.cell}>Nama Siswa</Text>
                    <Text style={styles.cell}>Kelas</Text>
                    <Text style={styles.cell}>Tanggal Pembayaran</Text>
                    <Text style={styles.lastCell}>Jumlah</Text>
                </View>

                {/* Rows */}
                {data?.map((item, index) => (
                    <View style={styles.tableRow} key={item.id}>
                        <Text style={styles.cell}>{index + 1}</Text>
                        <Text style={styles.cell}>{item.student_bill.students?.name}</Text>
                        <Text style={styles.cell}>
                            {item.student_bill.students?.class_student?.[0]?.name ?? "-"}
                        </Text>
                        <Text style={styles.cell}>{item.payment_date}</Text>
                        <Text style={styles.lastCell}>
                            {formatRupiah(item.student_bill.bill_amount || 0)}
                        </Text>
                    </View>
                ))}

                {/* Total Row */}
                <View style={styles.totalRow}>
                    <Text style={[styles.cell, { flex: 4 }]}>Total</Text>
                    <Text style={styles.lastCell}>
                        {formatRupiah(totalAmount)}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default StudentTransactionPDF;
