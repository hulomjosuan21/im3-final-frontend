"use server";

import { Inputs } from "@/context/input";
import axios from "axios";

export async function getData(inputs: Inputs) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prediction`,
      inputs
    );
    return data;
  } catch {
    throw new Error("Failed to fetch data");
  }
}
