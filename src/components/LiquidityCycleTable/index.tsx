import React, { FC, useState } from "react";

import useLiquiditiesWithdrawlPeriod from "@/hooks/useLiquiditiesWithdrawlPeriod";

import CustomPagination from "@/components/CustomPagination";
import {
  cols,
  SkeletonTableRows,
} from "@/components/LiquidityCycleTable/TableColsAndComponents";

import { ROWS_PER_PAGE } from "@/constant/data";

const LiquidityCycleTable: FC = () => {
  const { liquidities, fetching, updateData } = useLiquiditiesWithdrawlPeriod();

  const [sliced, setSliced] = useState<Data[]>([]);

  return (
    <div className="liquidity cycle wrapper table">
      <div className="title">
        <h1>Liquidity Cycle</h1>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              {cols.map((col, idx) => (
                <th key={idx}>{col.title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!fetching ? (
              sliced.map((row, idx) => (
                <tr key={idx}>
                  {cols.map((col, idx2) =>
                    col.render(
                      {
                        dataRow: row,
                        extraData: {
                          updateFunction: updateData,
                        },
                      },
                      `${idx}-${idx2}`
                    )
                  )}
                </tr>
              ))
            ) : (
              <SkeletonTableRows count={ROWS_PER_PAGE} />
            )}
          </tbody>
        </table>
      </div>

      <CustomPagination
        total={Math.ceil(liquidities.length / ROWS_PER_PAGE)}
        onChange={(page) => {
          const start = ROWS_PER_PAGE * (page - 1);
          const end = start + ROWS_PER_PAGE;
          setSliced(liquidities.slice(start, end));
        }}
      />
    </div>
  );
};

export default LiquidityCycleTable;
