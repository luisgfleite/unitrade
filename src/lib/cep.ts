// Consulta de CEP via ViaCEP (https://viacep.com.br)
export interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export const emptyAddress: Address = {
  cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
};

export function maskCep(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

export function formatAddress(a: Partial<Address>): string {
  const line1 = [a.street, a.number].filter(Boolean).join(', ');
  const parts = [
    [line1, a.neighborhood].filter(Boolean).join(' - '),
    [a.city, a.state].filter(Boolean).join('/'),
  ].filter(Boolean);
  return parts.join(' - ');
}

export async function fetchCep(cep: string): Promise<Partial<Address> | null> {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return {
      cep: maskCep(clean),
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || '',
    };
  } catch {
    return null;
  }
}
