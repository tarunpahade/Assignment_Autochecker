import { SetStateAction, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Tesseract from 'tesseract.js';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OCRComponent from './OcrComponent';
import { ChevronLeft, ChevronRight, Edit, Save, Trash } from 'lucide-react';
import { getCookies } from '@/lib/utils';
import ProgressSteps from '@/components/ui/stepper';
import { AssignTeachersStep3 } from './assignTeachersStep3';
import { StepsComponent } from './stepsComponent';
import axios from 'axios';
import Loading from '@/components/miniComponents/mini';
import { SignUp, classProps } from '@/types/interface'


const steps = [
  {
    label: 'Semester and Department',
    step: 1,
  },
  {
    label: 'Add Students',
    step: 2,
  },
  {
    label: 'Assign Teachers',
    step: 3,
  }
]
export default function CreateClass({ onClose, addClass }: any) {

  const [text2, setText] = useState('');
  const [teachersAssignedToClass, setTeachersAssignedToClass] = useState<SignUp[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClassCreation, setIsLoadingClassCreation] = useState(false);
  const [classDetails, setClassDetails] = useState<any>()

  const [editIndex, setEditIndex] = useState(null); 
  const [editName, setEditName] = useState('');
  const [inputValue, setInputValue] = useState('');


  const [userDetails, setStudentDetails] = useState<any>();
  const [currentStep, setCurrentStep] = useState(0);

  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState();

  const goNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    setStudentDetails(getCookies('user-details'));
  }, []);

  console.log(userDetails);

  const saveClassDetails = async () => {
    setIsLoadingClassCreation(true)
    try {

      const classes: classProps = {
        createdBy: userDetails.name,
        department,
        college: userDetails.college,
        university: userDetails.university,
        semester: semester!,
        teacherCount: teachersAssignedToClass.length,
        studentCount: classDetails.length,
        teachers: teachersAssignedToClass
      }
      const savedObj = {
        classDetails: classes,
        students: classDetails!,
      }

      const response = await axios.post('/api/admin/createNewClass', savedObj);
      console.log(response.data);
      setIsLoadingClassCreation(false)
      addClass()
      if (response.data.success) {
        console.log('Successfully added teacher');
      }
    } catch (error: any) {
      console.error('Error during user signup:', error.response?.data || error.message);
      throw error;
    }
  }

  const handleEditClick = (index: SetStateAction<null>, name: SetStateAction<string>) => {
    setEditIndex(index);
    setEditName(name);
  };

  const handleSaveClick = (index: any) => {
    if (editIndex !== null && editName) {
      const updatedDetails = [...classDetails];
      updatedDetails[index] = { ...updatedDetails[index], name: editName };
      setClassDetails(updatedDetails);
      setEditIndex(null); // Reset edit index
    }
  };

  const handleDeleteClick = (index: any) => {
    const updatedDetails = classDetails.filter((_: any, i: any) => i !== index);
    setClassDetails(updatedDetails);
  };

  const handleImageUpload = (event: { target: { files: any[]; }; }) => {

    setIsLoading(true);
    const imageFile = event.target.files[0];

    Tesseract.recognize(
      imageFile,
      'eng',
      {
        logger: m => console.log(m), // Logs progress
      }
    ).then(({ data: { text } }) => {
      setText(text)
      const namesArray = text.trim().split(/\s+/); // This regex splits on any whitespace character
      const users = [];

      for (let i = 0; i < namesArray.length; i += 3) { // Assuming 4 words per name
        const name = namesArray.slice(i, i + 3).join(' '); // Change 4 to 3 if needed
        users.push({
          "name": name,
          "userType": "Student",
          "semester": "8",
          "department": "CSE",
          "college": userDetails?.college,
          "university": userDetails?.college
        });
      }

      setClassDetails(users);
      setIsLoading(false);
    })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });

  };
  const handleImportExcel = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target!.result, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setClassDetails(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleCreateTable = (event: any) => {
    console.log(event);
    const text = event.target.value
    const namesArray = text.trim().split(/\s+/); // This regex splits on any whitespace character
    const users = [];

    for (let i = 0; i < namesArray.length; i += 3) { // Assuming 3 words per name
      const name = namesArray.slice(i, i + 3).join(' '); // Change 4 to 3 if needed
      users.push({
        "name": name,
        "semester": semester,
        "department": department,
        "college": userDetails.college,
        "userType": "Student",
        "university": userDetails.university,
        "password": "12345"
      });
    }

    setClassDetails(users);
    setIsLoading(false);
    setInputValue('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-white p-12 overflow-auto text-start">
      <button onClick={onClose} className="absolute top-10 right-8 text-4xl">
        &times;
      </button>
      <ProgressSteps steps={steps} currentStep={currentStep} />
      <div className='flex justify-between w-full'>
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight mb-5 ml-4">
          {steps[currentStep].label}
        </h1>
        {currentStep === 2 ? (
          <div className="flex items-center justify-between   p-1 rounded-full w-36">
            <button onClick={goBack} style={{ borderRadius: '18px' }} className="p-2 border-black border text-black  ">
              <ChevronLeft size={24} />
            </button>
            <Button variant={'outline'} className='hover:bg-black hover:text-white' onClick={saveClassDetails} >
              {isLoadingClassCreation ? (
                <Loading />
              ) : (
                <>Save</>
              )}

            </Button>
          </div>
        ) : (

          <div className="flex items-center justify-between   p-1 rounded-full w-36">
            <button onClick={goBack} style={{ borderRadius: '18px' }} className="p-2 border-black border text-black  ">
              <ChevronLeft size={24} />
            </button>
            <button onClick={goNext} style={{ borderRadius: '18px' }} className="p-2 border-black border text-black ">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
      {currentStep === 1 && (
        <>
          <div className='flex justify-start pt-3 p-10'>
            <Input type="Name" placeholder="Copy Paste Names Here" value={inputValue} onChange={handleCreateTable} className='mr-5' />
            <OCRComponent handleImageUpload={handleImageUpload} isLoading text={text2} />
            {isLoading ? 'Processing...' : null}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[350px]">Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead >College</TableHead>
                <TableHead >University</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classDetails && classDetails.map((detail: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      detail.name
                    )}
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{semester}</TableCell>
                  <TableCell>{department}</TableCell>
                  <TableCell>{detail.college}</TableCell>
                  <TableCell>{detail.university}</TableCell>
                  <TableCell className='grid-cols-2 gap-2'>
                    {editIndex === index ? (
                      <Button onClick={() => handleSaveClick(index)} variant={'secondary'}>
                        <Save size={16} />
                      </Button>
                    ) : (
                      <Button onClick={() => handleEditClick(index, detail.name)} variant={'secondary'}>
                        <Edit size={16} />
                      </Button>
                    )}
                    <Button onClick={() => handleDeleteClick(index)} variant={'secondary'}>
                      <Trash size={16} />

                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {currentStep === 2 && (
        <AssignTeachersStep3
          college={userDetails?.college}
          university={userDetails?.university}
          department={department} semester={semester!}
          teachersAssignedToClass={teachersAssignedToClass}
          setTeachersAssignedToClass={setTeachersAssignedToClass}
        />
      )}
      {currentStep === 0 && (
        <StepsComponent
          department={department}
          semester={semester}
          setDepartment={setDepartment}
          setSemester={setSemester}
        />
      )}
    </div>
  );
}

