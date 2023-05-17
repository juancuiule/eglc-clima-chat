"use client";
import { memo } from "react";
import {
  BookOpen,
  Headphones,
  HelpCircle,
  Image,
  RefreshCcw,
} from "react-feather";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

import "reactflow/dist/style.css";

type QuestionData = {
  question?: string;
  answer?: string;
};

type SourceData = {
  content: string;
  source: string;
};

export const Question = memo((props: NodeProps<QuestionData>) => {
  const {
    data: { question, answer },
    id,
  } = props;

  const { addNodes, addEdges, getNode } = useReactFlow();

  return (
    <div
      className={`group cursor-default flex flex-col w-fit h-fitjustify-center items-center gap-2`}
    >
      <Handle
        className="opacity-0 group-hover:opacity-100"
        type="target"
        position={Position.Top}
      />
      <Handle
        className="opacity-0 group-hover:opacity-100"
        type="source"
        id="handle-left"
        position={Position.Left}
      />
      <Handle
        className="opacity-0 group-hover:opacity-100"
        type="source"
        id="handle-right"
        position={Position.Right}
      />
      <Handle
        className="opacity-0 group-hover:opacity-100"
        type="source"
        id="handle-bottom"
        position={Position.Bottom}
      />
      <div className="flex gap-1 justify-center items-center h-10 w-full"></div>
      <div className="flex gap-2 h-full justify-center">
        <div className="w-10 flex flex-col items-center justify-center gap-1">
          {/* Left */}
          {answer !== undefined ? (
            <button
              className={`action-button`}
              onClick={() => {
                const node = getNode(id)!;

                const sources = [
                  "<strong><em>Alimentación.</em></strong> Necesitamos alimentar a tantas personas que es imposible que esto no genere cantidades importantes de GEI. Por más que toda la cadena de suministro esté impulsada por energía eléctrica proveniente de fuentes renovables, el crecimiento de las plantas y los animales que consumimos siempre va a tener emisiones asociadas. El total de GEI provenientes de la producción de alimentos fue de 18 Gt CO2-eq en 2019, es decir, el 34% (¡un tercio!) del total global. El principal GEI de este sector es el CH4 que generan las vacas, seguido de las emisiones de este mismo gas provenientes de los cultivos de arroz.",
                  "A diferencia de otros sectores, las emisiones de GEI asociadas a la producción y consumo de alimentos suelen ser mayores en los países en vías de desarrollo que en los países desarrollados. De hecho, este sector es especialmente importante para la realidad argentina. Según el Inventario Nacional de Gases de Efecto Invernadero, publicado en 2019 por la Secretaría de Ambiente y Desarrollo Sustentable de la Nación, la producción de energía es la fuente principal de GEI en nuestro país. Sin embargo, cuando se distribuye esa energía según los distintos subsectores que la utilizan (como la generación de electricidad, las distintas actividades industriales, o el transporte), la actividad ganadera pasa al primer lugar con el 21,6% de las emisiones totales de GEI. Esto es más del doble del promedio global correspondiente a este sector.",
                  "Es importante considerar que hay una importante variabilidad en la cantidad de GEI derivados de la producción de los distintos alimentos por múltiples factores, como el uso de fertilizantes y pesticidas o según si el ganado se cría de forma convencional o intensiva. De hecho, una oscura realidad nos indica que lo mejor para minimizar las emisiones de GEI asociadas a este consumo se da, lamentablemente, cuando más sufren los animales, es decir, cuando se los cría de manera más eficiente: la ganadería intensiva usa menos tierra, el alimento es abundante y los animales crecen más rápido dado que gastan menos energía en otras cosas, como en moverse. Por estas razones pueden encontrarse diversas estimaciones, según las condiciones en las cuales un determinado alimento es producido y los distintos acercamientos que se pueden haber utilizado para los cálculos de las emisiones asociadas. En cualquier caso, la producción de carne vacuna es el alimento que mayor cantidad de GEI genera, ya sea",
                  "acercamientos que se pueden haber utilizado para los cálculos de las emisiones asociadas. En cualquier caso, la producción de carne vacuna es el alimento que mayor cantidad de GEI genera, ya sea que lo consideremos por kilogramo, calorías o gramos de proteínas.",
                  `Como se mencionó en la primera parte del libro, producir la comida que usamos para alimentar al mundo emite a la atmósfera una gran cantidad de GEI. Si se contabilizan solo las emisiones del sector Agricultura, Silvicultura y Otros Usos del Suelo (AFOLU), se estima una emisión anual de 13 Gt CO2-eq por año, o sea, un 22% del total global. ¿Cómo podemos dimensionar esto? Digamos que es un 50% más de lo que emiten conjuntamente todos los aviones, camiones, autos y otros medios de transporte. Pero si consideramos todas las emisiones del sistema agroalimentario, tanto las que ocurren en el campo (AFOLU) como aquellas asociadas al transporte, procesamiento, almacenamiento, refrigeración y consumo de los alimentos, entonces ese valor asciende a 18 Gt CO2-eq por año, es decir, un tercio de las emisiones globales.[footnote content="De acuerdo con el último informe del IPCC (2022), las emisiones de GEI del sector AFOLU fueron 12,8 Gt CO2-eq, mientras que las correspondientes al sistema`,
                ];
                addNodes(
                  sources.map((content, i) => ({
                    id: `1.sources.${i + 1}`,
                    type: "source",
                    position: {
                      x: node.position.x - 100,
                      y: node.position.y,
                    },
                    data: {
                      content: content,
                      source: "https://www.google.com/",
                    },
                  }))
                );

                addEdges(
                  sources.map((content, i) => ({
                    id: `1.sources.${i + 1}--${id}`,
                    source: id,
                    target: `1.sources.${i + 1}`,
                  }))
                );
              }}
            >
              <BookOpen size={12} />
            </button>
          ) : null}
        </div>
        <div
          className={`z-20 border border-gray-300 bg-gray-50 rounded w-60 p-2`}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-sm">Question:</h2>
            <p className="text-gray-700 text-xs">{question}</p>
            {answer ? (
              <>
                <h2 className="text-sm">Answer:</h2>
                <p className="text-gray-700 text-xs">
                  El sector ganadero es responsable del 21,6% de las emisiones
                  totales de gases de efecto invernadero en{" "}
                  <span className="tag">Argentina</span>, según el Inventario
                  Nacional de Gases de Efecto Invernadero publicado en 2019 por
                  la Secretaría de Ambiente y Desarrollo Sustentable de la
                  Nación. Las vacas son la principal fuente de emisiones de
                  metano (<span className={`tag`}>CH4</span>
                  ), seguido de las emisiones de este mismo gas provenientes de
                  los cultivos de arroz.
                </p>
              </>
            ) : (
              <button className="w-full text-xs border">Ask</button>
            )}
          </div>
        </div>
        <div className="w-10 flex flex-col items-center justify-center gap-1">
          {/* Right */}
          {answer && (
            <>
              <button
                className={`action-button`}
                onClick={() => {
                  const node = getNode(id)!;

                  addNodes([
                    {
                      id: `${id}.images.1`,
                      type: "text2image",
                      position: {
                        x: node.position.x + 400,
                        y: node.position.y,
                      },
                      data: {
                        prompt: `Aerial view city street photograph, pedestrians, cyclists, and public transport, sustainable, ecofriendly filled lush green spaces, warm glow, volumetric light, photorealistic, Sony Alpha α7, ISO1900, Leica M ultra photoreail, ultra detailed, intrictae details ::1 \n Car, cars, asphalt, skycrapper ::-0.5`,
                        img: "https://cdn.discordapp.com/attachments/1001922191929135194/1108264258984230912/juan.cuiule_aerial_view_city_street_photograph_pedestrians_cycl_ce2ba652-96ef-4347-a730-81b42cc4d06a.png",
                      },
                    },
                  ]);

                  addEdges([
                    {
                      id: `${id}.images.1--${id}`,
                      source: id,
                      sourceHandle: "handle-right",
                      target: `${id}.images.1`,
                    },
                  ]);
                }}
              >
                <Image size={12} />
              </button>
              <button
                className={`action-button`}
                onClick={() => {
                  const node = getNode(id)!;

                  addNodes([
                    {
                      id: `${id}.audio.1`,
                      type: "audio",
                      position: {
                        x: node.position.x + 400,
                        y: node.position.y + 400,
                      },
                      data: {
                        audio:
                          "https://doc-00-88-docs.googleusercontent.com/docs/securesc/cp79d46ouved2ehgtu9l63su2mha1tj9/p4vf9ngvl5vt2umvjcdgj0j61ei1anns/1684301550000/10301272154438608508/10301272154438608508/1Qai19GLIT4kTcAwpYYe7U6Vdy1PxkGc1?e=download&ax=ADWCPKDoVbAhGuHQGBUSbWl5cFynpefRgvheSilzVyJSDX5g0rdkr6oUEtFtrOX6T7SCoTqhFATYxxhof8AJ-wsrG48j2IWajlsMzUSnMm3AQDPN8NkuG4NnqR67fByyeQLFQufuDzfVQr03SFiQ4upFRsfXtKMPqYBPy1K0-F6UcEWV4nUMpvJA3N3wF8bajZv7CALWB0DBOVhNtCkYGY1BXu3NOP46HQG7oHtoAnnAO3c9qkDmxcDIZYuskNm6Ot_dQC4iJq_rkubK0wvcTFLu4KttHm0eGVN5oAMZI3BqAUBxhpsngCBwo-_UEOVGPZMtykDS-7mIO_iZ_8CrYkmCZXe2Fq0Y5Wb3CjGJK6yLuT1GeuYilx_15gG--36sFYflL0wOMt12fIjHawT7E9SKlM97p08MBWrGsyf5WlkfGlAqkX1FjbIPeViGzOaG5fIPnwl55bAeGlt1IOcXoqI2xXQaHHOZomG0CxKP13ZLxMbi-zr4DPmpHfeUsBq4oqM_1gsP-bvF87lx3nMRwCTN9kaRW8EkXfJI0HkVwI2RJUOxyBbNZ8v_Lf1AlrFPGdOn-uhLF0emTG5LgjLPypXbhNZ-XnFkdgeAGNETTWbHxJAXw2XNdANo0iKJhV1cGS4qiGH0AtdRFz9G2iJORV_DfhQi1tQMBQl2p6c7KQj0ru92ZdpzWXXUBUxP5JdwTNUrkEpo-l0ruTs8nFUW3PH-hOv2FQdBtZrLs5EuTC3yO64FhIdzLEGZD_BvFVM3jKjT_p-w-UGdxKWDotKIE3bo4sFRz0PEOgeaFZQW1o5nugaaG0A03f_FVRMI1F71V8rY7hMWLIB5Mjet1ZLvOKm3XBMTlsUtlvf8T81-D0d1od-v0lE6zn773yZHG9Tv00nu24CzZhnrD_ghrAZAz74F5B7EDc1iwqRZGCFT-kOrQy_a2xrMhsN26csrf4xZLKdBNyQXTjjzBnt78S-_tVHfTPtevaHg2usYxwX-HbdOle_j&uuid=94d93f6e-50d6-4893-b8f6-125f5e00dcd6&authuser=1",
                        transcript:
                          "Lo que pasó el 5 de diciembre de 1952 en Londres fue una de las catástrofes ambientales más grandes y significativas en la historia del impacto que tiene sobre la salud la exposición a contaminantes del aire. Fue una semana muy fría en el invierno de diciembre en Londres, en aquel momento, en donde había una intensa actividad industrial y movilidad y había una condición, empezaba una condición climática natural, relativamente frecuente, que se llama inversión térmica de la atmósfera, que lo que hace es básicamente encerrar en una burbuja las emisiones que provienen de la combustión de combustibles fósiles, de la actividad industrial, del transporte y de toda la actividad humana en una determinada zona.",
                      },
                    },
                  ]);

                  addEdges([
                    {
                      id: `${id}.audio.1--${id}`,
                      source: id,
                      sourceHandle: "handle-right",
                      target: `${id}.audio.1`,
                    },
                  ]);
                }}
              >
                <Headphones size={12} />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-1 justify-center items-center h-10 w-full">
        {/* Bottom */}
        {answer && (
          <button
            className={`action-button`}
            onClick={() => {
              const node = getNode(id)!;

              const questions = [
                "¿Cuál es el impacto de la producción de alimentos en las emisiones de gases de efecto invernadero globales?",
                "¿Por qué las emisiones de GEI asociadas a la producción y consumo de alimentos suelen ser mayores en los países en vías de desarrollo que en los países desarrollados?",
                "¿Cómo se comparan las emisiones de GEI de la ganadería con las emisiones de otros sectores en Argentina?",
                "¿Qué factores influyen en la variabilidad de las emisiones de GEI derivadas de la producción de alimentos?",
              ];

              addNodes(
                questions.map((question, i) => ({
                  id: `${id}.questions.${i + 1}`,
                  type: "question",
                  position: {
                    x: node.position.x,
                    y: node.position.y + 500,
                  },
                  data: {
                    question: question,
                  },
                }))
              );

              addEdges(
                questions.map((question, i) => ({
                  id: `${id}.questions.${i + 1}--${id}`,
                  source: id,
                  sourceHandle: "handle-bottom",
                  target: `${id}.questions.${i + 1}`,
                }))
              );
            }}
          >
            <HelpCircle size={12} />
          </button>
        )}
        {/* <button className={`action-button`}>
          <PlusCircle size={12} />
        </button> */}
      </div>
    </div>
  );
});

export const Text2Image = memo(
  (props: NodeProps<{ prompt: string; img: string }>) => {
    const {
      id,
      data: { prompt, img },
    } = props;

    const { addNodes, addEdges, getNode } = useReactFlow();

    return (
      <div
        className={`group cursor-default flex flex-col w-fit h-fitjustify-center items-center gap-2`}
      >
        <Handle type="target" position={Position.Left} />
        <Handle type="source" id="handle-bottom" position={Position.Bottom} />
        <div className="flex gap-1 justify-center items-center h-10 w-full"></div>
        <div className="flex gap-2 h-full justify-center">
          <div className="w-10 flex flex-col items-center justify-center"></div>
          <div
            className={`z-20 border border-gray-300 bg-gray-50 rounded w-60 p-2`}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-sm">Prompt:</h2>
              <p className="text-gray-700 text-xs">{prompt}</p>
              <a href={img} target="_blank">
                <img className="rounded-sm cursor-pointer" src={img} alt="" />
              </a>
            </div>
          </div>
          <div className="w-10 flex flex-col items-center justify-center"></div>
        </div>
        <div className="flex gap-1 justify-center items-center h-10 w-full">
          <button
            className={`action-button`}
            onClick={() => {
              const node = getNode(id)!;

              addNodes([
                {
                  id: `${id}.text2image.1`,
                  type: "text2image",
                  position: {
                    x: node.position.x,
                    y: node.position.y + 500,
                  },
                  data: {
                    prompt:
                      "detailed photograph of a tranquil suburban street with a lively car-free urban plaza filled with pedestrians and outdoor seating, a wooden or ceramic planter filled with beautiful flowers, international architecture, establishing wide shot from above, cyclists pedaling furiously to their destination, whimsical, Sigma 35mm f/22",
                    img: "https://cdn.midjourney.com/c5a30dce-f8d4-4ad8-8863-ca0263a2aef0/0_0.png",
                  },
                },
              ]);

              addEdges([
                {
                  id: `${id}.text2image.1--${id}`,
                  source: id,
                  sourceHandle: "handle-bottom",
                  target: `${id}.text2image.1`,
                },
              ]);
            }}
          >
            <RefreshCcw size={12} />
          </button>
        </div>
      </div>
    );
  }
);

export const Source = memo((props: NodeProps<SourceData>) => {
  const {
    data: { content, source },
  } = props;

  return (
    <div
      className={`group cursor-default flex flex-col w-fit h-fit justify-center items-center gap-2`}
    >
      <div className="flex gap-2 h-full justify-center">
        <div
          className={`z-20 border border-gray-300 bg-gray-50 rounded w-60 p-2`}
        >
          <div className="flex flex-col gap-2">
            <details open>
              <summary className="text-sm">Source:</summary>
              <p className="text-gray-700 text-xs">{content}</p>
              <a href="#" target="_blank" className="text-xs text-blue-400">
                {source}
              </a>
            </details>
          </div>
        </div>
        <Handle type="target" position={Position.Right} />
      </div>
    </div>
  );
});

export const Audio = memo(
  (props: NodeProps<{ audio: string; transcript: string }>) => {
    const {
      data: { audio, transcript },
    } = props;
    return (
      <div
        className={`group cursor-default flex flex-col w-fit h-fitjustify-center items-center gap-2`}
      >
        <Handle type="target" position={Position.Left} />
        <div className="flex gap-1 justify-center items-center h-10 w-full"></div>
        <div className="flex gap-2 h-full justify-center">
          <div className="w-10 flex flex-col items-center justify-center"></div>
          <div
            className={`z-20 border border-gray-300 bg-gray-50 rounded w-60 p-2`}
          >
            <div className="flex flex-col gap-2">
              <audio className="w-auto" controls src={audio} />
              <h2 className="text-sm">Transcript:</h2>
              <p className="text-gray-700 text-xs">
                Lo que pasó el{" "}
                <span className="tag">5 de diciembre de 1952</span> en Londres
                fue una de las catástrofes ambientales más grandes y
                significativas en la historia del impacto que tiene sobre la
                salud la exposición a contaminantes del aire. Fue una semana muy
                fría en el invierno de diciembre en{" "}
                <span className="tag">Londres</span>, en aquel momento, en donde
                había una intensa actividad industrial y movilidad y había una
                condición, empezaba una condición climática natural,
                relativamente frecuente, que se llama inversión térmica de la
                atmósfera, que lo que hace es básicamente encerrar en una
                burbuja las emisiones que provienen de la combustión de
                combustibles fósiles, de la actividad industrial, del transporte
                y de toda la actividad humana en una determinada zona.
              </p>
            </div>
          </div>
          <div className="w-10 flex flex-col items-center justify-center"></div>
        </div>
      </div>
    );
  }
);
