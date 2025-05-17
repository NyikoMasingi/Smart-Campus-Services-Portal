import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import autoTable from "jspdf-autotable";

type ReportType = "users" | "booking" | "ticket";

const Reports = () => {
  const [reportType, setReportType] = useState<ReportType | "">("");
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (type: ReportType) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${type}`);
      if (!response.ok) throw new Error("Fetch error");
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast.error("Failed to fetch data.");
      setData([]);
    }
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as ReportType;
    setReportType(selected);
    fetchData(selected);
  };

  const exportPDF = () => {
    if (data.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF();
    const keys = Object.keys(data[0]);
    const rows = data.map((row) => keys.map((key) => row[key]));

    doc.text(`${reportType.toUpperCase()} REPORT`, 14, 10);
    autoTable(doc, {
  head: [keys],
  body: rows,
  startY: 20,
});

    doc.save(`${reportType}_report.pdf`);
  };

  const exportCSV = () => {
    if (data.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const keys = Object.keys(data[0]);
    const csvRows = [keys.join(",")];
    data.forEach((row) => {
      const values = keys.map((k) => `"${row[k]}"`);
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${reportType}_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Generate Reports</h1>

      <div className="space-y-4">
        <div>
          <label className="font-medium mr-2">Select Report:</label>
          <select
            value={reportType}
            onChange={handleReportChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">-- Select Report Type --</option>
            <option value="users">Users</option>
            <option value="booking">Booking</option>
            <option value="ticket">Ticket</option>
          </select>
        </div>

        {reportType && data.length > 0 && (
          <div className="flex gap-4">
            <Button onClick={exportPDF}>
              <DownloadIcon className="mr-2 w-4 h-4" />
              Export PDF
            </Button>
            <Button onClick={exportCSV} variant="outline">
              <DownloadIcon className="mr-2 w-4 h-4" />
              Export CSV
            </Button>
          </div>
        )}
      </div>

      <div>
        <Card>
          <CardContent className="p-4">
            {reportType && data.length > 0 ? (
              <div className="overflow-auto">
                <table className="table-auto w-full border border-gray-300">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th
                          key={key}
                          className="border border-gray-300 p-2 bg-gray-100 text-left"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={i}>
                        {Object.values(item).map((val, j) => (
                          <td key={j} className="border border-gray-300 p-2">
  {String(val ?? "N/A")}
</td>

                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No report selected or no data available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
