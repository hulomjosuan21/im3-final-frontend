"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-4 text-center mt-[48px]">
      <div className="flex items-center px-2 gap-4 w-full py-4">
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
      </div>

      <Alert className="max-w-2xl mb-6 text-left">
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This project uses a real-world dataset from Kaggle.
          <br />
          Note: The prediction may or may not work as expected.
        </AlertDescription>
      </Alert>

      <p className="text-sm max-w-2xl mb-6">
        This project predicts whether you are likely to become an entrepreneur
        based on various factors like Field of Study, Gender, Job Level, Age,
        Internships, Projects, Certifications, Starting Salary, Promotion
        Timeline, Career Satisfaction, High School GPA, SAT Score, University
        Ranking, University GPA, Soft Skills, Networking, Work-Life Balance, and
        Job Offers.
      </p>

      <p className="text-md max-w-2xl mb-6">Example data used for training:</p>

      <ScrollArea className="h-[100px] pr-4 max-w-2xl mb-6">
        <pre className="rounded text-left text-sm overflow-x-auto whitespace-pre-wrap">
          {`
{
  "Field_of_Study": "Arts",
  "Gender": "Male",
  "Current_Job_Level": "Entry",
  "Age": 25,
  "Internships_Completed": 3,
  "Projects_Completed": 7,
  "Certifications": 1,
  "Starting_Salary": 10000,
  "Years_to_Promotion": 1,
  "Career_Satisfaction": 1,
  "High_School_GPA": 3.58,
  "SAT_Score": 1052,
  "University_Ranking": 291,
  "University_GPA": 3.96,
  "Soft_Skills_Score": 10,
  "Networking_Score": 1,
  "Work_Life_Balance": 7,
  "Job_Offers": 1
}
`}
        </pre>
      </ScrollArea>

      <p className="text-sm max-w-2xl mb-6">Result:</p>

      <ScrollArea className="h-[100px] pr-4 max-w-2xl mb-6">
        <pre className="rounded p-4 text-left text-sm overflow-x-auto whitespace-pre-wrap">
          {`
{
  "payload": "The prediction is likely 'Yes' with a probability of 51.1%.",
  "prediction": [
    {
      "No": 48.9,
      "Yes": 51.1
    }
  ]
}
`}
        </pre>
      </ScrollArea>

      <div className="py-8">
        <Link
          href="https://github.com/hulomjosuan21"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          Get in Touch on GitHub
        </Link>
      </div>
    </div>
  );
}
