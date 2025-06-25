import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Sale } from "../types";
import dayjs from "dayjs";
import { Tooltip } from "@mui/material";

interface CommissionSummary {
  salesPersonId: string;
  salesPersonName: string;
  quarterly: {
    [q: string]: {
      totalSales: number;
      totalCommission: number;
      bonus: number;
    };
  };
  grandTotalSales: number;
  grandTotalCommission: number;
  grandTotalBonus: number;
}

const getQuarter = (dateStr: string): string => {
  const month = dayjs(dateStr).month();
  if (month < 3) return "Q1";
  if (month < 6) return "Q2";
  if (month < 9) return "Q3";
  return "Q4";
};

const CommissionReport: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [report, setReport] = useState<CommissionSummary[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data: Sale[]) => {
        setSales(data);
        setReport(generateReport(data));
      })
      .catch((err) => console.error("Failed to fetch sales:", err));
  }, []);

  const generateReport = (sales: Sale[]): CommissionSummary[] => {
    const BONUS_RATE = 0.01;
    const map = new Map<string, CommissionSummary>();

    sales.forEach((sale) => {
      const q = getQuarter(sale.date);
      const spId = sale.salesPerson.id;
      const key = spId;

      const salePrice = sale.product.salePrice;
      const commission = salePrice * (sale.product.commissionPercentage / 100);
      const bonus = salePrice * BONUS_RATE;

      if (!map.has(key)) {
        map.set(key, {
          salesPersonId: spId,
          salesPersonName: `${sale.salesPerson.firstName} ${sale.salesPerson.lastName}`,
          quarterly: {
            Q1: { totalSales: 0, totalCommission: 0, bonus: 0 },
            Q2: { totalSales: 0, totalCommission: 0, bonus: 0 },
            Q3: { totalSales: 0, totalCommission: 0, bonus: 0 },
            Q4: { totalSales: 0, totalCommission: 0, bonus: 0 },
          },
          grandTotalSales: 0,
          grandTotalCommission: 0,
          grandTotalBonus: 0,
        });
      }

      const summary = map.get(key)!;
      summary.quarterly[q].totalSales += salePrice;
      summary.quarterly[q].totalCommission += commission;
      summary.quarterly[q].bonus += bonus;

      summary.grandTotalSales += salePrice;
      summary.grandTotalCommission += commission;
      summary.grandTotalBonus += bonus;
    });

    return Array.from(map.values());
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Quarterly Commission Report
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        * Quarterly bonus is calculated as <strong>1% of total sales</strong>.
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Salesperson</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Total Commission</TableCell>
              <TableCell>
                <Tooltip title="Bonus is 1% of total sales">
                  <span>Total Bonus</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row) => (
              <React.Fragment key={row.salesPersonId}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => toggleRow(row.salesPersonId)}>
                      {expandedRows[row.salesPersonId] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.salesPersonName}</TableCell>
                  <TableCell>${row.grandTotalSales.toFixed(2)}</TableCell>
                  <TableCell>${row.grandTotalCommission.toFixed(2)}</TableCell>
                  <TableCell>${row.grandTotalBonus.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse
                      in={expandedRows[row.salesPersonId]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant="subtitle2" gutterBottom>
                          Quarterly Breakdown
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Quarter</TableCell>
                              <TableCell>Sales</TableCell>
                              <TableCell>Commission</TableCell>
                              <TableCell>Bonus</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(row.quarterly).map(
                              ([quarter, data]) => (
                                <TableRow key={quarter}>
                                  <TableCell>{quarter}</TableCell>
                                  <TableCell>
                                    ${data.totalSales.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    ${data.totalCommission.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    ${data.bonus.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommissionReport;
