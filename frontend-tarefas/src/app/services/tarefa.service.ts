import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TarefaAtualizacaoDTO,
  TarefaCriacaoDTO,
  TarefaLeituraDTO,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly apiUrl = 'http://localhost:5023/api/Tarefas';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<TarefaLeituraDTO[]> {
    return this.http.get<TarefaLeituraDTO[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<TarefaLeituraDTO> {
    return this.http.get<TarefaLeituraDTO>(`${this.apiUrl}/${id}`);
  }

  criar(tarefa: TarefaCriacaoDTO): Observable<TarefaLeituraDTO> {
    return this.http.post<TarefaLeituraDTO>(this.apiUrl, tarefa);
  }

  atualizar(id: number, tarefa: TarefaAtualizacaoDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tarefa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
