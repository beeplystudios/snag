import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import { NumberInput } from "./number-input";
import { TextInput } from "./text-input";

const mappings = [
  [z.string(), TextInput],
  [z.number(), NumberInput],
] as const;

export const TsForm = createTsForm(mappings);
