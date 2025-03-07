import { useState } from "react";
import { useAccounts } from "../../../hooks/useAccounts";
import { TCurrentActionState, TUseAccountsOptions } from "../../../typings";
import TablePagination from "../../common/table/TablePagination";
import AccountsTable from "./AccountsTable";

type TAccountsModalProps = {
  currentActionState: TCurrentActionState;
};

export default function AccountsModal({ currentActionState }: TAccountsModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsLimit] = useState(7);

  const customer = currentActionState.current;
  const accountsOptions: TUseAccountsOptions = {
    page: currentPage,
    limit: accountsLimit,
    customerId: customer?.id,
  };

  const { data, numOfPages, error } = useAccounts(accountsOptions);

  return (
    <div className="flex flex-col gap-10 px-3">
      <h2 className="text-3xl mb-5 font-semibold">
        {currentActionState.current?.name} {currentActionState.current?.surname}{" "}
        <span className="text-lg text-neutral-400">accounts</span>
      </h2>
      <AccountsTable data={data} />
      {!!numOfPages && (
        <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={numOfPages} />
      )}

      {error && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
