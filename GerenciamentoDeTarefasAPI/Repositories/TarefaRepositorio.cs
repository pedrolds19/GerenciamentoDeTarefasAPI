using GerenciamentoDeTarefasAPI.Data;
using GerenciamentoDeTarefasAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciamentoDeTarefasAPI.Repositories
{
    public class TarefaRepositorio : ITarefaRepositorio
    {
        private readonly AppDbContext _contexto;

        public TarefaRepositorio(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<List<Tarefa>> BuscarTodasAsync()
            => await _contexto.Tarefas.ToListAsync();

        public async Task<Tarefa?> BuscarPorIdAsync(int id)
            => await _contexto.Tarefas.FindAsync(id);

        public async Task<Tarefa> CriarAsync(Tarefa tarefa)
        {
            _contexto.Tarefas.Add(tarefa);
            await _contexto.SaveChangesAsync();
            return tarefa;
        }

        public async Task AtualizarAsync(Tarefa tarefa)
        {
            _contexto.Tarefas.Update(tarefa);
            await _contexto.SaveChangesAsync();
        }

        public async Task RemoverAsync(Tarefa tarefa)
        {
            _contexto.Tarefas.Remove(tarefa);
            await _contexto.SaveChangesAsync();
        }

        public async Task<bool> SalvarAlteracoesAsync()
            => await _contexto.SaveChangesAsync() > 0;
    }
}
