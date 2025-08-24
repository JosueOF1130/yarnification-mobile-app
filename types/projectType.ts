export type ProjectsDataType = {
    id: string,
    createdAt: number,
    projectName: string,
    yarnType: string,
    projectType: string,
    yardsPerBall: number,
    min: number,
    max: number,
    yarnBrand: string,
    yarnMaterial: string,
    yarnUsed: number,
    hookSize: number,
    timeSpent: number
}

export type ProjectDataType = {
    createdAt: number,
    projectName: string,
    yarnType: string | null,
    projectType: string | null,
    yardsPerBall: number,
    min: number,
    max: number,
    yarnBrand: string,
    yarnMaterial: string,
    yarnUsed: number,
    hookSize: number,
    timeSpent: number,
    public?: boolean
}



