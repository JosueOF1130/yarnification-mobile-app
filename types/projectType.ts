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
    timeSpent: number,
    public: boolean,
}

export type ProjectDataType = {
    createdAt: number,

    projectName: string,

    yarnType: string,
    projectType: string,

    projectMin: number,
    projectMax: number,

    yardsPerBall: number,
    min: number,
    max: number,

    yarnBrand: string,
    yarnMaterial: string,

    yarnUsed: number,
    hookSize: number,
    timeSpent: number,

    personalNotes: string,
    publicCaption: string,
    
    public: boolean,
}



