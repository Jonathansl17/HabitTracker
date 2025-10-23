"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Todo {
  id: string
  name: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoName, setNewTodoName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/habits")
      if (!response.ok) throw new Error("Error al cargar las tareas")
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las tareas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoName.trim()) return

    try {
      setIsAdding(true)
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTodoName }),
      })

      if (!response.ok) throw new Error("Error al crear la tarea")

      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setNewTodoName("")
      toast({
        title: "Tarea creada",
        description: "La tarea se agregó correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la tarea",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      })

      if (!response.ok) throw new Error("Error al actualizar la tarea")

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la tarea",
        variant: "destructive",
      })
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: "DELETE",
      })

      setTodos(todos.filter((todo) => todo.id !== id))
      toast({
        title: "Tarea eliminada",
        description: "La tarea se eliminó correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      })
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={addTodo} className="flex gap-2">
          <Input
            type="text"
            placeholder="Agregar nueva tarea..."
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            disabled={isAdding}
            className="flex-1"
          />
          <Button type="submit" disabled={isAdding || !newTodoName.trim()}>
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">Agregar</span>
          </Button>
        </form>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
            <span>
              {todos.length} {todos.length === 1 ? "tarea" : "tareas"}
            </span>
            <span>
              {completedCount} {completedCount === 1 ? "completada" : "completadas"}
            </span>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <Card className="p-12">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg mb-2">No hay tareas</p>
                  <p className="text-sm">Agrega tu primera tarea para comenzar</p>
                </div>
              </Card>
            ) : (
              todos.map((todo) => (
                <Card key={todo.id} className="p-4 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id, todo.completed)}
                      className="h-5 w-5"
                    />
                    <span
                      className={`flex-1 text-base ${
                        todo.completed ? "line-through text-muted-foreground" : "text-card-foreground"
                      }`}
                    >
                      {todo.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
