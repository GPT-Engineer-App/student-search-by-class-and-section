import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const toast = useToast();

  const handleSearch = async () => {
    // TODO: Implement the API call to search for students based on classValue and section
    try {
      // This is a placeholder for where you would fetch data from your backend API
      const response = await fetch("/api/search-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class: classValue, section }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to search for students.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="flex-start">
        <FormControl id="class">
          <FormLabel>Class</FormLabel>
          <Input type="text" value={classValue} onChange={(e) => setClassValue(e.target.value)} />
        </FormControl>
        <FormControl id="section">
          <FormLabel>Section</FormLabel>
          <Select placeholder="Select section" value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSearch}>
          Search Students
        </Button>
      </VStack>

      {students.length > 0 && (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>Roll Number</Th>
              <Th>Gender</Th>
              <Th>Class</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student, index) => (
              <Tr key={index}>
                <Td>{student.name}</Td>
                <Td>{student.rollNumber}</Td>
                <Td>{student.gender}</Td>
                <Td>{student.class}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Index;
