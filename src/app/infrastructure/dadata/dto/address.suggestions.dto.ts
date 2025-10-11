export interface AddressSuggestionsResponseDto {
  suggestions: Address[];
}

export interface Address {
  value: string;
  unrestricted_value: string;
}
