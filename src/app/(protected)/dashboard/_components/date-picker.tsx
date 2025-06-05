"use client";

import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsIsoDate, useQueryState } from "nuqs";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter(); // Inicializar useRoute
  //anexa na url os params from e to com seus valores. ex: form=12-03
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );

  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  const handleDateSelect = async (dateRange: DateRange | undefined) => {
    /*  if (dateRange?.from) {
      setFrom(dateRange.from, {
        shallow: false,// o next recarrega a página quando o valor muda
      });
    }
    if (dateRange?.to) {
      setTo(dateRange.to, {
        shallow: false,
      });
    } */

    if (dateRange) {
      if (dateRange.from && !dateRange.to) {
        // Usuário selecionou a *primeira* data de um novo intervalo
        // Limpe 'to' e defina 'from'
        await setFrom(dateRange.from, { shallow: true }); //shallow recarrega a página qd toe from mudam
        await setTo(null, { shallow: true }); // <--- IMPORTANTE: Reseta o 'to'
      } else if (dateRange.from && dateRange.to) {
        // Usuário completou um intervalo (clicou na segunda data)
        await setFrom(dateRange.from, { shallow: true });
        await setTo(dateRange.to, { shallow: true });
        router.refresh(); // <--- CHAMA router.refresh() AQUI!
      } else {
        // Caso em que o usuário desseleciona tudo (raro para range)
        await setFrom(null, { shallow: true });
        await setTo(null, { shallow: true });
        router.refresh(); // <--- CHAMA router.refresh() AQUI!
      }
    } else {
      // Se dateRange for undefined (ex: clique fora ou desseleção completa)
      await setFrom(null, { shallow: true }); // <--- Mude undefined para null
      await setTo(null, { shallow: true }); // <--- Mude undefined para null
      router.refresh(); // <--- CHAMA router.refresh() AQUI!
    }
  };

  const date = {
    from,
    to,
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date.from && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(date.to, "LLL dd, y", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
