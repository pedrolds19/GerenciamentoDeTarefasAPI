using AutoMapper;
using GerenciamentoDeTarefasAPI.DTOs;
using GerenciamentoDeTarefasAPI.Models;
using GerenciamentoDeTarefasAPI.Repositories;

namespace GerenciamentoDeTarefasAPI.Services
{
    public class TarefaServico : ITarefaServico
    {
        private readonly ITarefaRepositorio _repositorio;
        private readonly IMapper _mapper;

        public TarefaServico(ITarefaRepositorio repositorio, IMapper mapper)
        {
            _repositorio = repositorio;
            _mapper = mapper;
        }

        public async Task<List<TarefaLeituraDTO>> ListarAsync()
        {
            var tarefas = await _repositorio.BuscarTodasAsync();
            return _mapper.Map<List<TarefaLeituraDTO>>(tarefas);
        }

        public async Task<TarefaLeituraDTO?> BuscarPorIdAsync(int id)
        {
            var tarefa = await _repositorio.BuscarPorIdAsync(id);
            return tarefa == null ? null : _mapper.Map<TarefaLeituraDTO>(tarefa);
        }

        public async Task<TarefaLeituraDTO> CriarAsync(TarefaCriacaoDTO dto)
        {
            var novaTarefa = _mapper.Map<Tarefa>(dto);
            var tarefaCriada = await _repositorio.CriarAsync(novaTarefa);
            return _mapper.Map<TarefaLeituraDTO>(tarefaCriada);
        }

        public async Task<bool> AtualizarAsync(int id, TarefaAtualizacaoDTO dto)
        {
            var tarefaExistente = await _repositorio.BuscarPorIdAsync(id);
            if (tarefaExistente == null) return false;

            _mapper.Map(dto, tarefaExistente);
            await _repositorio.AtualizarAsync(tarefaExistente);
            return true;
        }

        public async Task<bool> RemoverAsync(int id)
        {
            var tarefa = await _repositorio.BuscarPorIdAsync(id);
            if (tarefa == null) return false;

            await _repositorio.RemoverAsync(tarefa);
            return true;
        }
    }
}
