export const VEHICLE = {
	MIN_VALUE: 3000.0,
	MIN_WARRANTY: 3750.0,
	MAX_VALUE: 100000.0,
	MAX_WARRANTY: 125000.0,
	INSTALLMENTS: [24, 36, 48],
	TYPE: 'veiculo'
}

export const PROPERTY = {
	MIN_VALUE: 30000.0,
	MIN_WARRANTY: 37500.0,
	MAX_VALUE: 4500000.0,
	MAX_WARRANTY: 5625000.0,
	INSTALLMENTS: [120, 180, 240],
	TYPE: 'imovel'
}

export const ALLOWED_RANGE = {
	WARRANTY: 'WARRANTY',
	LOAN: 'LOAN'
}

export const IOF = 0.0638 // Using direct value to save computational resource
export const INTEREST_RATE = 0.0234 // Using direct value to save computational resource
