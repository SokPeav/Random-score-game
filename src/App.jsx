import React, { useMemo, useState, useEffect } from "react";
import { IconButton, HStack, Box, Text, Button } from "@chakra-ui/react";
import { HiOutlineTrash } from "react-icons/hi";
import ReactTable from "./components/ReactTable";
import { Persons } from "./constant";
import { AnimatePresence, motion } from "framer-motion";
function App() {
	const [person, setPerson] = useState(Persons);
	const [randomNum, setRandomNum] = useState([]);
	const [count, setCount] = useState(0);

	const generate = () => {
		let arrayContainer = []; // this arrays holds the five random numbers generated;
		const genNum = Math.floor(Math.random() * person.length + 1);
		arrayContainer.push(genNum);
		for (let counter = 0; counter < person.length - 1; counter++) {
			//the counter is less than five because we already initialise arrayContainer[0] with genNum
			let newGen = Math.floor(Math.random() * person.length + 1);
			while (arrayContainer.lastIndexOf(newGen) !== -1) {
				newGen = Math.floor(Math.random() * person.length + 1);
			}
			arrayContainer.push(newGen);
		}

		setRandomNum(arrayContainer);
	};

	const Delay = ({ children, delay }) => {
		const [done, setDone] = useState(false);

		useEffect(() => {
			const showTimer = setTimeout(() => setDone(true), delay);
			return () => clearTimeout(showTimer);
		});

		return done && <>{children}</>;
	};

	const motionProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			type: "tween",
			duration: 2,
		},
	};
	const columns = useMemo(
		() => [
			{
				Header: "N°",
				accessor: "id",
			},
			{
				Header: "First Name",
				accessor: "firstName",
			},

			{
				Header: "Last Name",
				accessor: "lastName",
			},
			{
				Header: "Random Number",
				Cell: (field) => (
					<AnimatePresence>
						<Delay delay={field.row.index * 300}>
							<motion.p {...motionProps}>{randomNum[field.row.index]}</motion.p>
						</Delay>
					</AnimatePresence>
				),
			},
			{
				Header: "Remove",
				id: "action",
				Cell: ({ row: { original } }) => (
					<HStack spacing="1">
						<IconButton
							onClick={() => {
								setPerson((per) => per.filter((item) => item.id !== original.id));
								setRandomNum([]);
								setCount(0);
							}}
							size="sm"
							variant="ghost"
							color="red.500"
							icon={<HiOutlineTrash size="1.3rem" />}
						/>
					</HStack>
				),
			},
		],
		//eslint-disable-next-line
		[randomNum]
	);

	console.log(count);

	return (
		<Box bg="#3B2F41" h="100vh" overflow="auto">
			<Box mx="auto" px={10} mt={5}>
				<Box justifyContent="center" display="flex" p={10}>
					<Button
						isDisabled={count === 3}
						onClick={() => {
							generate();
							setCount(count + 1);
						}}
					>
						Start
						{/* {count !== 3 ? "Start" : "Stop"} */}
					</Button>
				</Box>
				<ReactTable columns={columns} data={person} />
				<Text w="35%" mt={2} justifyContent="end" align-item="flex-end" p={5} bg="white">
					Random Count : {count}
				</Text>
			</Box>
		</Box>
	);
}

export default App;
