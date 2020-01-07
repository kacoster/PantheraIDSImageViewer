#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
viewerimgclssfctnud <- function(filePath, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = filePath,
    componentID = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'viewerimgclssfctnud',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageViewer',
    elementId = elementId
  )
}

#' Shiny bindings for viewerimgclssfctnud
#'
#' Output and render functions for using viewerimgclssfctnud within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a viewerimgclssfctnud
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name viewerimgclssfctnud-shiny
#'
#' @export
viewerimgclssfctnudOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'viewerimgclssfctnud', width, height, package = 'PantheraIDSImageViewer')
}

#' @rdname viewerimgclssfctnud-shiny
#' @export
renderViewerimgclssfctnud <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, viewerimgclssfctnudOutput, env, quoted = TRUE)
}
