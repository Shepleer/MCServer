import { MedicineBranch } from "@prisma/client";

function medicineBranchFromRawValue(index: number): MedicineBranch {
    let allCases = Object.entries(MedicineBranch);
    return allCases.at(index)?.[1] ?? MedicineBranch.ALLERGOLOGY;
}

export { medicineBranchFromRawValue };