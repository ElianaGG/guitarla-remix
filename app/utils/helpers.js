export const formatDate = fecha => {
    const newDate = new Date(fecha)

    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }
    return newDate.toLocaleDateString("es-ES", options)
}