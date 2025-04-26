import { TypingAnimation } from "./magicui/typing-animation";
import { Badge } from "./ui/badge";
import workingAnimation1 from "@/assets/lotties/Animation - 1745333040567.json";
import workingAnimation2 from "@/assets/lotties/Animation - 1745320599234.json";
import workingAnimation3 from "@/assets/lotties/Animation - 1745333177240.json";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLottie } from "lottie-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const Step1: React.FC = () => {
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

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col pb-18 overflow-y-auto">
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
                        className="p-2 rounded-full cursor-pointer hover:scale-105 hover:opacity-90 transition ease-in-out"
                    >
                        {field}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

const Step2: React.FC = () => {
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
        <div className="flex items-center justify-start flex-col pt-12 pb-18 h-screen overflow-y-auto">
            <div className="">{View}</div>

            <div className="pb-12">
                <TypingAnimation duration={25} className="text-sm font-lg font-normal">
                    Tell us more about yourself.
                </TypingAnimation>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Select Gender</Label>
                    <Select>
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
                    <Select>
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
                    <Input type="number" placeholder="How old are you?" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Internships Completed</Label>
                    <Input type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Projects Completed</Label>
                    <Input type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Number of Certifications</Label>
                    <Input type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Starting Salary</Label>
                    <Input type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Years to Promote</Label>
                    <Input type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label>Career Satisfaction</Label>
                    <Input type="number" />
                </div>
            </div>
        </div>
    );
};

const Step3: React.FC = () => {
    const style = {
        height: 250,
    };
    const options = {
        animationData: workingAnimation3,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options, style);

    return <div className="flex items-center justify-start flex-col pt-12 pb-18 h-screen overflow-y-auto">
        <div className="mt-4">{View}</div>

        <div className="py-12 px-4">
            <TypingAnimation duration={25} className="text-sm font-lg font-normal text-center">
                Please provide us details about your academic background, skills, and career-related metrics.
            </TypingAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="flex flex-col space-y-1.5">
                <Label>High School GPA</Label>
                <Input type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>SAT Score</Label>
                <Input type="number" />
                <span className="text-muted-foreground text-sm">Scholastic Assessment Test Score</span>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>University Ranking</Label>
                <Input type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>University GPA</Label>
                <Input type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>Soft Skill Score</Label>
                <Input type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>Networking Score</Label>
                <Input type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label>Work Life Balance</Label>
                <Input type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label>Job Offers</Label>
                <Input type="number" />
            </div>
        </div>

    </div>
}

export { Step1, Step2, Step3 }