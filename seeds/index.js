/**
 * CONTEXTO: Quiero crear Shelters, las Shelters tienen Pets dentro.
 * 1. Tengo que crear las Pets, ejecutando el seed de Pets.
 * 2. Creo Shelters y en ese campo, le añado las Pets que he creado previamente.
 * 
 * 
 * ¿Por qué? Porque si ejecuto el seed de Pets y no de Shelters también, las shelters que 
 * teníamos en DB ahora harán referencia a Pets que hemos borrado (al ejecutar solo seed de Pets);
 * 
 */
