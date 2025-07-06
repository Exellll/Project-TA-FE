import day from "data/constant/day";
import { isEmpty } from "lodash";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "react-daisyui";

export interface Columns<T> {
  fieldId: string;
  fieldId2?: string;
  fieldId3?: string;
  label: string;
  render?: (data?: T, index?: number) => React.ReactElement | string;
  renderHeader?: () => React.ReactElement | string;
}

interface Props<T> {
  data?: any[];
  columns: Columns<T>[];
  ranked?: boolean;
  loading?: boolean | null;
  error?: string;
  action?: boolean;
  currentPage?: number;
  limit?: number;
  onRowClick?: (item: T) => void;
  id?: string[];
  setIsChecked?: Dispatch<SetStateAction<string[]>>;
  modal?: React.ReactElement;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Table<T>({
  data = [],
  columns = [],
  ranked = false,
  loading = false,
  error = "",
  action = false,
  currentPage = 1,
  limit = 0,
  onRowClick,
  id = [""],
  setIsChecked,
  modal
}: Props<T>): React.ReactElement {
  const handleRowClick = (item: T): void => {
    if (onRowClick !== undefined) {
      onRowClick(item);
    }
  };
  return (
    <table className="min-w-full !border-none">
      <thead className="bg-white/80 rounded-s-full">
        <tr className="border-b-2 border-[#E9ECFF]">
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="p-4 text-center whitespace-nowrap text-sm font-semibold text-black"
            >
              <div className="flex justify-center">
                {column.label === "checkbox" ? (
                  <input
                    type="checkbox"
                    className="max-w-4 h-4 cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (setIsChecked) {
                        if (e.target.checked) {
                          setIsChecked(data.map((el) => el.id));
                        } else {
                          setIsChecked([]);
                        }
                      }
                    }}
                  />
                ) : (
                  column.label
                )}
                {column?.renderHeader !== undefined && column?.renderHeader()}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading !== true &&
          isEmpty(error) &&
          !isEmpty(data) &&
          data?.map((data, index) => (
            <tr
              key={index}
              className={classNames(
                ranked
                  ? index === 0
                    ? "bg-[#EDFCD3]"
                    : index === 1
                    ? "bg-[#DCE1FE]"
                    : index === 2
                    ? "bg-[#FFF7D2]"
                    : ""
                  : "",
                "border-b-2 border-[#E9ECFF]",
                action ? "hover:bg-gray-300 hover:cursor-pointer transition-colors duration-200" : "",
                id.includes(data?.id)
                  ? "z-10 relative bg-white filter-table"
                  : ""
              )}
              onDoubleClick={(): void => {
                handleRowClick(data);
              }}
              role={action ? "button" : undefined}
            >
              {columns.map((column, row) => (
                <td
                  key={row}
                  className={`p-4 py-10 text-center whitespace-nowrap text-sm leading-7 ${
                    row === 7 || row === 8 ? "" : ""
                  } `}
                >
                  {column.fieldId === "index" && (
                    <p className="font-semibold">
                      {index + 1 + (currentPage - 1) * limit}
                    </p>
                  )}
                  {column.fieldId === "effectiveDay" && (
                    <p className="font-semibold">
                      {day[index].name}
                    </p>
                  )}
                  {column.fieldId === "checkbox" && (
                    <input
                      id={data?.id + "checkbox"}
                      value={data?.id}
                      type="checkbox"
                      checked={id.includes(data?.id)}
                      className="max-w-4 h-4 cursor-pointer"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (setIsChecked) {
                          if (e.target.checked) {
                            setIsChecked((prev) => [...prev, e.target.value]);
                          } else {
                            setIsChecked(id.filter((item) => item !== data.id));
                          }
                        }
                      }}
                    />
                  )}
                  <p className="font-semibold">
                    {column?.render === undefined && data[column.fieldId]}
                  </p>
                  <p className="text-gray-500">
                    {column?.fieldId2 !== undefined && data[column.fieldId2]}
                  </p>
                  {column?.render !== undefined && column.render(data, index)}
                  <span>
                    {column?.fieldId3 !== undefined && data[column.fieldId3]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        {loading !== true && isEmpty(error) && isEmpty(data) && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              <div className="flex flex-col items-center">
                <span className="py-6 text-base text-[#7C7C7C] ">
                  No Data Here
                </span>
              </div>
            </td>
          </tr>
        )}
        {loading !== true && !isEmpty(error) && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              {error}
            </td>
          </tr>
        )}
        {loading === true && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
