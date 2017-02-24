declare interface IPerson {
	name: string,
	email: string,
	job?: string,
	location?: string,
	tag?: string,
	avatar?: string
}

declare interface IAddNewPersonModalResponse{
	save: boolean;
	person?: any; 
}