interface Props<T> {
    data: T[];
    keyPath?: string; // Jalur key yang digunakan sebagai id, bisa nested (contoh: 'level1.level2.id')
}

export const ToListStringConverter = <T extends { [key: string]: any }>({
    data,
    keyPath = 'id', // Default menggunakan 'id' sebagai key
}: Props<T>): string[] => {
    const getValueByPath = (item: any, path: string): any => {
        return path.split('.').reduce((acc, key) => acc && acc[key], item);
    };

    return data.map((item) => getValueByPath(item, keyPath)?.toString() || "");
};
