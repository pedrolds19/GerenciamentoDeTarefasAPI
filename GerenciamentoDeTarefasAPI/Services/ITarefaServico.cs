using GerenciamentoDeTarefasAPI.DTOs;

namespace GerenciamentoDeTarefasAPI.Services
{
    public interface ITarefaServico
    {
        Task<List<TarefaLeituraDTO>> ListarAsync();
        Task<TarefaLeituraDTO?> BuscarPorIdAsync(int id);
        Task<TarefaLeituraDTO> CriarAsync(TarefaCriacaoDTO dto);
        Task<bool> AtualizarAsync(int id, TarefaAtualizacaoDTO dto);
        Task<bool> RemoverAsync(int id);
    }
}
