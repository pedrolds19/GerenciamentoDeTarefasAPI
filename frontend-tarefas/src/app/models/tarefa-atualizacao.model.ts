export interface TarefaAtualizacaoDTO {
  titulo: string | null;
  descricao: string | null;
  dataLimite: string;
  concluida: boolean;
}
