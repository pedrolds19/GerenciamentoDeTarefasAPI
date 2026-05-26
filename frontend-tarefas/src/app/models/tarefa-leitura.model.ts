export interface TarefaLeituraDTO {
  id: number;
  titulo: string | null;
  descricao: string | null;
  dataLimite: string;
  concluida: boolean;
}
