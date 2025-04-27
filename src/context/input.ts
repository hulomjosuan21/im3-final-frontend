import { atom } from "jotai";

export type Inputs = {
  Field_of_Study: string;
  Gender: string;
  Current_Job_Level: string;
  Age: number;
  Internships_Completed: number;
  Projects_Completed: number;
  Certifications: number;
  Starting_Salary: number;
  Years_to_Promotion: number;
  Career_Satisfaction: number;
  High_School_GPA: number;
  SAT_Score: number;
  University_Ranking: number;
  University_GPA: number;
  Soft_Skills_Score: number;
  Networking_Score: number;
  Work_Life_Balance: number;
  Job_Offers: number;
  [key: string]: string | number;
};

export const initialInputs = atom<Inputs>({
  Field_of_Study: "",
  Gender: "",
  Current_Job_Level: "",
  Age: 0,
  Internships_Completed: 0,
  Projects_Completed: 0,
  Certifications: 0,
  Starting_Salary: 0,
  Years_to_Promotion: 0,
  Career_Satisfaction: 0,
  High_School_GPA: 0,
  SAT_Score: 0,
  University_Ranking: 0,
  University_GPA: 0,
  Soft_Skills_Score: 0,
  Networking_Score: 0,
  Work_Life_Balance: 0,
  Job_Offers: 0,
});

export function isAllInputsFilled(inputs: Inputs) {
  for (const key in inputs) {
    const value = inputs[key as keyof Inputs];

    if (typeof value === "string" && value.trim() === "") {
      throw new Error(`${key.replaceAll("_", " ")} cannot be empty.`);
    }

    if (typeof value === "number") {
      if (value < 0) {
        throw new Error(`${key.replaceAll("_", " ")} cannot be negative.`);
      }

      if (key === "High_School_GPA" && value === 0) {
        throw new Error("High School GPA cannot be 0.");
      }

      if (key === "Starting_Salary" && value === 0) {
        throw new Error("Starting Salary cannot be 0.");
      }

      if (key === "Age" && value <= 12) {
        throw new Error("Age must be greater than 12.");
      }
    }
  }
}
