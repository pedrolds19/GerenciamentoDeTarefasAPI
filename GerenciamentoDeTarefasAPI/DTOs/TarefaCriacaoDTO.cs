namespace GerenciamentoDeTarefasAPI.DTOs
{
    public class TarefaCriacaoDTO
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public DateTime DataLimite { get; set; }
    }
}
