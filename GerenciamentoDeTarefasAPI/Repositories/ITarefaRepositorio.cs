using GerenciamentoDeTarefasAPI.Models;

namespace GerenciamentoDeTarefasAPI.Repositories
{
    public interface ITarefaRepositorio
    {
        Task<List<Tarefa>> BuscarTodasAsync();
        Task<Tarefa?> BuscarPorIdAsync(int id);
        Task<Tarefa> CriarAsync(Tarefa tarefa);
        Task AtualizarAsync(Tarefa tarefa);
        Task RemoverAsync(Tarefa tarefa);
        Task<bool> SalvarAlteracoesAsync();
    }
}
