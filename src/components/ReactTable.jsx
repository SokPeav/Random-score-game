import React from "react";
import { useSortBy, useTable } from "react-table";
import { AnimatePresence, motion } from "framer-motion";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

const MotionRow = motion(Tr);

export default function ReactTable({ background = "gray.50", color = "gray.800", columns, ...props }) {
	let { data } = props;

	const memorizedData = React.useMemo(() => (data ? data : [{}]), [data]);
	const { getTableProps, getTableBodyProps, setHiddenColumns, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data: memorizedData || [],
		},
		useSortBy
	);
	React.useEffect(() => {
		setHiddenColumns(columns.filter((column) => column.isVisible).map((column) => column.id));
	}, [setHiddenColumns, columns]);

	return (
		<>
			<Table border="2px" {...getTableProps()} size="sm" variant="simple">
				<Thead bg={"black"}>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th py="4" {...column.getHeaderProps()} color={"white"}>
									{column.render("Header")}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<AnimatePresence>
								<MotionRow
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									cursor="pointer"
									_hover={{ bg: "gray.50" }}
									{...row.getRowProps()}
								>
									{row.cells.map((cell) => (
										<Td bg="#D8A8E8" pos="unset !important" style={{ cursor: "pointer" }} py="2" {...cell.getCellProps()}>
											{cell.render("Cell")}
										</Td>
									))}
								</MotionRow>
							</AnimatePresence>
						);
					})}
				</Tbody>
			</Table>
		</>
	);
}
