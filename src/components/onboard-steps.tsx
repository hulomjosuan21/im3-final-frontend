import { TypingAnimation } from "./magicui/typing-animation";
import { Badge } from "./ui/badge";
import workingAnimation1 from "@/assets/lotties/Animation - 1745333040567.json";
import workingAnimation2 from "@/assets/lotties/Animation - 1745320599234.json";
import workingAnimation3 from "@/assets/lotties/Animation - 1745333177240.json";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLottie } from "lottie-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { initialInputs, Inputs } from "@/context/input";
import { useAtom } from "jotai";

const Step1: React.FC = () => {
  const [inputs, setInputs] = useAtom(initialInputs);

  const style = {
    height: 300,
  };

  const options = {
    animationData: workingAnimation1,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  const fields = [
    "Arts",
    "Aerospace Engineering",
    "Agricultural Engineering",
    "Biomedical Engineering",
    "Civil Engineering",
    "Water Resources Engineering",
    "Mining Engineering",
    "Ocean Engineering",
    "Medicine",
    "Neurology",
    "Dermatology",
    "Graphic Design",
    "Fashion Design",
    "Industrial Design",
  ];

  const handleFieldSelection = (field: string) => {
    setInputs((prev) => ({
      ...prev,
      Field_of_Study: field,
    }));
  };

  return (
    <div
      className="flex justify-center items-center flex-col pt-2 pb-18 overflow-y-auto"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      {View}
      <div className="pb-12 px-4">
        <TypingAnimation duration={25} className="text-sm font-lg font-normal">
          What is your primary field of study?
        </TypingAnimation>
      </div>
      <div className="flex justify-center gap-2 flex-wrap mx-4 max-w-2xl">
        {fields.map((field, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className={`p-2 rounded-full cursor-pointer hover:scale-105 hover:opacity-90 transition ease-in-out ${
              inputs.Field_of_Study === field && "bg-accent"
            }`}
            onClick={() => handleFieldSelection(field)}
          >
            {field}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const Step2: React.FC = () => {
  const [inputs, setInputs] = useAtom(initialInputs);

  const handleChange = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const style = {
    height: 300,
  };
  const options = {
    animationData: workingAnimation2,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div
      className="flex items-center justify-start flex-col py-18 overflow-y-auto"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="">{View}</div>

      <div className="pb-12">
        <TypingAnimation duration={25} className="text-sm font-lg font-normal">
          Tell us more about yourself.
        </TypingAnimation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="flex flex-col space-y-1.5 w-full">
          <Label>Select Gender</Label>
          <Select
            defaultValue={inputs.Gender}
            onValueChange={(value) =>
              handleChange("Gender", value as Inputs["Gender"])
            }
          >
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Current Job Level</Label>
          <Select
            defaultValue={inputs.Current_Job_Level}
            onValueChange={(value) =>
              handleChange(
                "Current_Job_Level",
                value as Inputs["Current_Job_Level"]
              )
            }
          >
            <SelectTrigger id="job-level" className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="Entry">Entry</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Age</Label>
          <Input
            type="number"
            defaultValue={inputs.Age ?? ""}
            onChange={(e) => handleChange("Age", Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Internships Completed</Label>
          <Input
            type="number"
            defaultValue={inputs.Internships_Completed ?? ""}
            onChange={(e) =>
              handleChange("Internships_Completed", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Projects Completed</Label>
          <Input
            type="number"
            defaultValue={inputs.Projects_Completed ?? ""}
            onChange={(e) =>
              handleChange("Projects_Completed", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Number of Certifications</Label>
          <Input
            type="number"
            defaultValue={inputs.Certifications ?? ""}
            onChange={(e) =>
              handleChange("Certifications", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Starting Salary</Label>
          <Input
            type="number"
            defaultValue={inputs.Starting_Salary ?? ""}
            onChange={(e) =>
              handleChange("Starting_Salary", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Years to Promote</Label>
          <Input
            type="number"
            defaultValue={inputs.Years_to_Promotion ?? ""}
            onChange={(e) =>
              handleChange("Years_to_Promotion", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Career Satisfaction</Label>
          <Input
            type="number"
            defaultValue={inputs.Career_Satisfaction ?? ""}
            onChange={(e) =>
              handleChange("Career_Satisfaction", Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};

const Step3: React.FC = () => {
  const [inputs, setInputs] = useAtom(initialInputs);

  const handleChange = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const style = {
    height: 250,
  };
  const options = {
    animationData: workingAnimation3,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div
      className="flex items-center justify-start flex-col pt-12 pb-18 overflow-y-auto"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="mt-4">{View}</div>

      <div className="py-12 px-4">
        <TypingAnimation
          duration={25}
          className="text-sm font-lg font-normal text-center"
        >
          Please provide us details about your academic background, skills, and
          career-related metrics.
        </TypingAnimation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="flex flex-col space-y-1.5">
          <Label>High School GPA</Label>
          <Input
            type="number"
            defaultValue={inputs.High_School_GPA ?? ""}
            onChange={(e) =>
              handleChange("High_School_GPA", Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>SAT Score</Label>
          <Input
            type="number"
            defaultValue={inputs.SAT_Score ?? ""}
            onChange={(e) => handleChange("SAT_Score", Number(e.target.value))}
          />
          <span className="text-muted-foreground text-sm">
            Scholastic Assessment Test Score
          </span>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>University Ranking</Label>
          <Input
            type="number"
            defaultValue={inputs.University_Ranking ?? ""}
            onChange={(e) =>
              handleChange("University_Ranking", Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>University GPA</Label>
          <Input
            type="number"
            defaultValue={inputs.University_GPA ?? ""}
            onChange={(e) =>
              handleChange("University_GPA", Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>Soft Skill Score</Label>
          <Input
            type="number"
            defaultValue={inputs.Soft_Skills_Score ?? ""}
            onChange={(e) =>
              handleChange("Soft_Skills_Score", Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>Networking Score</Label>
          <Input
            type="number"
            defaultValue={inputs.Networking_Score ?? ""}
            onChange={(e) =>
              handleChange("Networking_Score", Number(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>Work Life Balance</Label>
          <Input
            type="number"
            defaultValue={inputs.Work_Life_Balance ?? ""}
            onChange={(e) =>
              handleChange("Work_Life_Balance", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Job Offers</Label>
          <Input
            type="number"
            defaultValue={inputs.Job_Offers ?? ""}
            onChange={(e) => handleChange("Job_Offers", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export { Step1, Step2, Step3 };
