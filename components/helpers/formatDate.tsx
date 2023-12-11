export const formatDate = dateToday => {
    const newDate = new Date(dateToday.split('T')[0].split('-'))

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return newDate.toLocaleDateString('es-ES', options)
}
